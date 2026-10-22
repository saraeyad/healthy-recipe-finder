import recipesData from '../../data.json'

export const fetchRecipes = async () => {
  return Promise.resolve(recipesData)
}

export const getRecipeBySlug = async (slug) => {
  const recipes = await fetchRecipes()
  return recipes.find((recipe) => recipe.slug === slug)
}

