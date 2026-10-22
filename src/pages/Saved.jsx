import { Link } from 'react-router-dom'
import { useRecipes } from '../hooks/useRecipes'
import { useKitchen } from '../kitchen/KitchenContext'
import RecipeCard from '../components/RecipeCard'
import Eyebrow from '../components/ui/Eyebrow'
import LoadingState from '../components/LoadingState'

function RecipeRow({ title, empty, recipes }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-extrabold tracking-tight text-ink">{title}</h2>
      {recipes.length === 0 ? (
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{empty}</p>
      ) : (
        <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => <RecipeCard key={recipe.slug} recipe={recipe} />)}
        </div>
      )}
    </section>
  )
}

function Saved() {
  const { recipes, loading } = useRecipes()
  const { favorites, recent, cooked } = useKitchen()
  const bySlug = new Map(recipes.map((recipe) => [recipe.slug, recipe]))
  const pick = (slugs) => slugs.map((slug) => bySlug.get(slug)).filter(Boolean)
  const cookedRows = cooked
    .map((entry) => ({ ...entry, recipe: bySlug.get(entry.slug) }))
    .filter((entry) => entry.recipe)

  return (
    <div>
      <section className="mx-auto max-w-6xl pb-12">
        <Eyebrow>On this device</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-ink sm:text-5xl">
          Saved, recent, and cooked
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          Favorites and your cook history stay with this account on this browser.
        </p>
        {loading ? (
          <LoadingState message="Loading your kitchen..." />
        ) : (
          <>
            <RecipeRow
              title="Saved recipes"
              recipes={pick(favorites)}
              empty="Tap the heart on a recipe to keep it here."
            />
            <RecipeRow
              title="Recently viewed"
              recipes={pick(recent)}
              empty="Open a recipe and it will show up here."
            />
            <section className="mt-12">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">Cooked</h2>
              {cookedRows.length === 0 ? (
                <p className="mt-3 text-sm text-ink-muted">
                  Finish cook mode with “I cooked this” and the meal is recorded.{' '}
                  <Link to="/recipes" className="font-bold text-primary">Browse recipes</Link>
                </p>
              ) : (
                <ul className="mt-5 divide-y divide-divider overflow-hidden rounded-3xl border border-ink/[0.06] bg-white shadow-card">
                  {cookedRows.map((entry) => (
                    <li key={`${entry.slug}-${entry.at}`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                      <div>
                        <Link to={`/recipe/${entry.recipe.slug}`} className="font-bold text-ink hover:text-primary">{entry.recipe.title}</Link>
                        <p className="text-sm text-ink-muted">{entry.servings} {entry.servings === 1 ? 'serving' : 'servings'}</p>
                      </div>
                      <time className="text-sm font-semibold text-ink-muted" dateTime={entry.at}>
                        {new Date(entry.at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                      </time>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </section>
    </div>
  )
}

export default Saved
