import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { filterAndSort } from '../utils/recipeLogic'

function readNumber(value) {
  if (value == null || value === '') return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

export const useRecipeFilters = (recipes) => {
  const [params, setParams] = useSearchParams()
  const searchTerm = params.get('q') || ''
  const maxPrep = readNumber(params.get('prep'))
  const maxCook = readNumber(params.get('cook'))
  const diets = (params.get('diet') || '').split(',').filter(Boolean)
  const sort = params.get('sort') || 'featured'

  const update = (patch) => {
    const next = new URLSearchParams(params)
    const apply = (key, value) => {
      if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) next.delete(key)
      else next.set(key, Array.isArray(value) ? value.join(',') : String(value))
    }
    if ('searchTerm' in patch) apply('q', patch.searchTerm)
    if ('maxPrep' in patch) apply('prep', patch.maxPrep)
    if ('maxCook' in patch) apply('cook', patch.maxCook)
    if ('diets' in patch) apply('diet', patch.diets)
    if ('sort' in patch) apply('sort', patch.sort === 'featured' ? '' : patch.sort)
    setParams(next, { replace: true })
  }

  const filteredRecipes = useMemo(
    () => filterAndSort(recipes, { searchTerm, maxPrep, maxCook, diets, sort }),
    [recipes, searchTerm, maxPrep, maxCook, diets, sort],
  )

  const hasFilters = Boolean(
    searchTerm || maxPrep != null || maxCook != null || diets.length || sort !== 'featured',
  )

  const clear = () => setParams({}, { replace: true })

  return {
    searchTerm,
    maxPrep,
    maxCook,
    diets,
    sort,
    filteredRecipes,
    update,
    hasFilters,
    clear,
  }
}
