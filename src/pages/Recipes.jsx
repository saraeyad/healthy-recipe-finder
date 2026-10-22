import { useRecipes } from '../hooks/useRecipes'
import { useRecipeFilters } from '../hooks/useRecipeFilters'
import RecipeFilters from '../components/RecipeFilters'
import RecipeGrid from '../components/RecipeGrid'
import Eyebrow from '../components/ui/Eyebrow'
import Reveal from '../components/ui/Reveal'
import ErrorMessage from '../components/ErrorMessage'

function Recipes() {
  const { recipes, loading, error } = useRecipes()
  const {
    searchTerm,
    maxPrep,
    maxCook,
    diets,
    sort,
    filteredRecipes,
    update,
    hasFilters,
    clear,
  } = useRecipeFilters(recipes)

  return (
    <div className="bg-canvas pt-28 lg:pt-32">
      <section className="relative overflow-hidden px-4 pb-6 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 overflow-hidden" aria-hidden="true">
          <div className="animate-aurora-a absolute -left-20 -top-24 h-80 w-80 rounded-full bg-mkt-glow/30 blur-3xl" />
          <div className="animate-aurora-b absolute -right-16 top-0 h-72 w-72 rounded-full bg-mkt-sky/40 blur-3xl" />
        </div>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>The library</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-ink sm:text-5xl">
            Explore our simple, healthy recipes
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
            Search by name or ingredient, narrow by time and diet, and sort for the night you actually have.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <div className="sticky top-24 z-20 mb-8">
              <div className="rounded-3xl border border-white/80 bg-white/90 p-3 shadow-panel backdrop-blur-xl">
                <RecipeFilters
                  filters={{ searchTerm, maxPrep, maxCook, diets, sort }}
                  onFilterChange={update}
                  onClear={clear}
                  hasFilters={hasFilters}
                />
              </div>
            </div>
            <p className="mb-5 text-sm font-semibold text-ink-muted" aria-live="polite">
              {loading
                ? 'Loading recipes…'
                : `${filteredRecipes.length} of ${recipes.length} recipe${recipes.length === 1 ? '' : 's'}`}
            </p>
            {!loading && filteredRecipes.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
                <p className="text-lg font-extrabold text-ink">Nothing matches those filters</p>
                <p className="mt-2 text-sm text-ink-muted">Try a broader search, or clear the time and diet limits.</p>
                {hasFilters && (
                  <button type="button" className="btn mt-6" onClick={clear}>Clear filters</button>
                )}
              </div>
            ) : (
              <div id="recipesGrid" aria-live="polite" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <RecipeGrid recipes={filteredRecipes} loading={loading} />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}

export default Recipes
