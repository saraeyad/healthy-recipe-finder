export const filterRecipes = (recipes, filters) => {
  const { searchTerm, maxPrep, maxCook } = filters

  let filtered = recipes.filter((recipe) => {
    const matchesSearch =
      !searchTerm ||
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.overview.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPrep = maxPrep === null || recipe.prepMinutes <= maxPrep
    const matchesCook = maxCook === null || recipe.cookMinutes <= maxCook

    return matchesSearch && matchesPrep && matchesCook
  })

  return filtered
}

