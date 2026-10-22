import assert from 'node:assert/strict'
import test from 'node:test'
import recipes from '../../data.json' with { type: 'json' }
import {
  buildShoppingList,
  classifyRecipe,
  emptyPlan,
  filterAndSort,
  formatQuantity,
  planEntries,
  relatedRecipes,
  scaleIngredient,
  scaleIngredients,
} from './recipeLogic.js'

const bySlug = (slug) => recipes.find((recipe) => recipe.slug === slug)

test('search matches ingredients, not only the title', () => {
  const found = filterAndSort(recipes, { searchTerm: 'asparagus' })
  assert.deepEqual(found.map((recipe) => recipe.slug), ['one-pan-lemon-garlic-salmon-with-asparagus'])
})

test('every search word has to match', () => {
  const found = filterAndSort(recipes, { searchTerm: 'lemon garlic' })
  assert.equal(found.length, 1)
  assert.equal(found[0].slug, 'one-pan-lemon-garlic-salmon-with-asparagus')
})

test('diet tags come from the ingredient list', () => {
  const salad = classifyRecipe(bySlug('mediterranean-chickpea-salad'))
  assert.ok(salad.diets.includes('vegan'))
  assert.ok(salad.diets.includes('gluten-free'))
  assert.ok(salad.diets.includes('protein'))

  const salmon = classifyRecipe(bySlug('one-pan-lemon-garlic-salmon-with-asparagus'))
  assert.equal(salmon.diets.includes('vegetarian'), false)

  const toast = classifyRecipe(bySlug('avocado-tomato-wholegrain-toast'))
  assert.equal(toast.diets.includes('vegan'), true)
  assert.equal(toast.diets.includes('gluten-free'), false)

  const tacos = classifyRecipe(bySlug('sweet-potato-black-bean-tacos'))
  assert.ok(tacos.diets.includes('gluten-free'))

  const yogurt = classifyRecipe(bySlug('greek-yogurt-berry-parfait'))
  assert.equal(yogurt.diets.includes('vegan'), false)
  assert.ok(yogurt.diets.includes('vegetarian'))
})

test('vegan filter hides fish and dairy', () => {
  const found = filterAndSort(recipes, { diets: ['vegan'] }).map((recipe) => recipe.slug)
  assert.equal(found.includes('one-pan-lemon-garlic-salmon-with-asparagus'), false)
  assert.equal(found.includes('greek-yogurt-berry-parfait'), false)
  assert.equal(found.includes('mediterranean-chickpea-salad'), true)
  assert.equal(found.includes('lentil-spinach-soup'), true)
})

test('quickest sort is stable and uses total time', () => {
  const found = filterAndSort(recipes, { sort: 'time' })
  const times = found.map((recipe) => recipe.prepMinutes + recipe.cookMinutes)
  const ordered = [...times].sort((a, b) => a - b)
  assert.deepEqual(times, ordered)
})

test('quantities scale and keep useful fractions', () => {
  assert.equal(formatQuantity(1.5), '1 1/2')
  assert.equal(formatQuantity(2 / 3), '2/3')
  assert.equal(formatQuantity(0.75), '3/4')
  assert.equal(scaleIngredient('1/2 red bell pepper, diced', 1.5), '3/4 red bell pepper, diced')
  assert.equal(scaleIngredient('1 can (400 g) chickpeas, drained & rinsed', 2), '2 can (800 g) chickpeas, drained & rinsed')
  const salad = bySlug('mediterranean-chickpea-salad')
  const scaled = scaleIngredients(salad.ingredients, salad.servings, salad.servings)
  assert.deepEqual(scaled, salad.ingredients)
})

test('shopping list merges the same ingredient and unit', () => {
  const list = buildShoppingList(
    [
      { slug: 'mediterranean-chickpea-salad', servings: 2 },
      { slug: 'one-pan-lemon-garlic-salmon-with-asparagus', servings: 2 },
    ],
    recipes,
  )
  const oil = list.find((item) => item.label.toLowerCase().includes('extra-virgin olive oil') && item.label.toLowerCase().includes('tbsp'))
  assert.ok(oil)
  assert.match(oil.label, /^3 Tbsp /)
  assert.equal(oil.recipes.length, 2)
})

test('plan entries read each meal slot', () => {
  const plan = emptyPlan()
  plan.thursday.dinner = { slug: 'mediterranean-chickpea-salad', servings: 2 }
  const entries = planEntries(plan)
  assert.equal(entries.length, 1)
  assert.equal(entries[0].slug, 'mediterranean-chickpea-salad')
  assert.equal(entries[0].meal, 'dinner')
  const list = buildShoppingList(entries, recipes)
  assert.ok(list.some((item) => /olive oil/i.test(item.label)))
})

test('related recipes prefer shared ingredients and stay in a stable order', () => {
  const salmon = bySlug('one-pan-lemon-garlic-salmon-with-asparagus')
  const related = relatedRecipes(recipes, salmon, 3)
  assert.equal(related.length, 3)
  assert.equal(related.some((recipe) => recipe.slug === salmon.slug), false)
  assert.deepEqual(related, relatedRecipes(recipes, salmon, 3))
})
