import { useState, useEffect } from 'react'
import { fetchRecipes } from '../services/recipeService'

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true)
        const data = await fetchRecipes()
        setRecipes(data)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Error loading recipes:', err)
      } finally {
        setLoading(false)
      }
    }

    loadRecipes()
  }, [])

  return { recipes, loading, error }
}

