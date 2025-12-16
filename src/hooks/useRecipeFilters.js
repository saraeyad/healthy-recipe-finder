import { useState, useEffect } from 'react'
import { filterRecipes } from '../utils/recipeFilters'

export const useRecipeFilters = (recipes) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [maxPrep, setMaxPrep] = useState(null)
  const [maxCook, setMaxCook] = useState(null)
  const [filteredRecipes, setFilteredRecipes] = useState([])

  useEffect(() => {
    const filtered = filterRecipes(recipes, {
      searchTerm,
      maxPrep,
      maxCook,
    })
    setFilteredRecipes(filtered)
  }, [recipes, searchTerm, maxPrep, maxCook])

  return {
    searchTerm,
    setSearchTerm,
    maxPrep,
    setMaxPrep,
    maxCook,
    setMaxCook,
    filteredRecipes,
  }
}

