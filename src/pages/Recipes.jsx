import { useRecipes } from '../hooks/useRecipes'
import { useRecipeFilters } from '../hooks/useRecipeFilters'
import RecipeFilters from '../components/RecipeFilters'
import RecipeGrid from '../components/RecipeGrid'

function Recipes() {
  const { recipes, loading } = useRecipes()
  const {
    searchTerm,
    setSearchTerm,
    maxPrep,
    setMaxPrep,
    maxCook,
    setMaxCook,
    filteredRecipes,
  } = useRecipeFilters(recipes)

  const handleFilterChange = (updates) => {
    if (updates.searchTerm !== undefined) setSearchTerm(updates.searchTerm)
    if (updates.maxPrep !== undefined) setMaxPrep(updates.maxPrep)
    if (updates.maxCook !== undefined) setMaxCook(updates.maxCook)
  }

  return (
    <main className="pt-[72px] md:pt-[93px]">
      {/* Hero Section */}
      <section className="my-12 md:mt-16 md:mb-12 lg:mt-20 lg:mb-16">
        <div className="text-left lg:text-center max-w-3xl lg:mx-auto">
          <h1 className="text-preset-2 mb-3">
            Explore our simple, healthy recipes
          </h1>
          <p>
            Discover eight quick, whole-food dishes that fit real-life schedules
            and taste amazing. Use the search bar to find a recipe by name or
            ingredient, or simply scroll the list and let something delicious
            catch your eye.
          </p>
        </div>
      </section>

      {/* Recipes Grid Section */}
      <section className="lg:pb-24">
        <RecipeFilters
          filters={{ searchTerm, maxPrep, maxCook }}
          onFilterChange={handleFilterChange}
        />

        <div
          id="recipesGrid"
          aria-live="polite"
          className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3"
        >
          <RecipeGrid recipes={filteredRecipes} loading={loading} />
        </div>
      </section>
    </main>
  )
}

export default Recipes
