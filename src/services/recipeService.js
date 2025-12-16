import recipesData from '../../data.json'

export const fetchRecipes = async () => {
  return Promise.resolve(recipesData)
}

export const getRecipeBySlug = async (slug) => {
  const recipes = await fetchRecipes()
  return recipes.find((recipe) => recipe.slug === slug)
}

export const getRandomRecipes = (recipes, excludeSlug, count = 3) => {
  return recipes
    .filter((recipe) => recipe.slug !== excludeSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, count)
}

