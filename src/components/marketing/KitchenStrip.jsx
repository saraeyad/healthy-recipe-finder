import { Link } from 'react-router-dom'
import { useRecipes } from '../../hooks/useRecipes'
import { useKitchen } from '../../kitchen/KitchenContext'
import { DAYS, MEALS, planEntries, todayId } from '../../utils/recipeLogic'

function KitchenStrip() {
  const { recipes } = useRecipes()
  const { favorites, plan } = useKitchen()
  const bySlug = new Map(recipes.map((recipe) => [recipe.slug, recipe]))
  const today = todayId()
  const upcoming = planEntries(plan)
    .map((entry) => ({ ...entry, recipe: bySlug.get(entry.slug) }))
    .filter((entry) => entry.recipe)
    .slice(0, 3)

  return (
    <section className="bg-canvas px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-panel backdrop-blur lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
        <div>
          <p className="text-sm font-semibold text-mkt-emerald-deep">Your kitchen</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Pick up where you left off</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {favorites.length
              ? `${favorites.length} saved recipe${favorites.length === 1 ? '' : 's'} on this device.`
              : 'Save a recipe and it stays in this browser.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/plan" className="inline-flex h-11 items-center rounded-full bg-gradient-to-br from-primary to-mkt-teal px-5 text-sm font-bold text-white shadow-brand">Open the planner</Link>
            <Link to="/saved" className="inline-flex h-11 items-center rounded-full border border-ink/10 bg-white px-5 text-sm font-bold text-mkt-teal">Saved recipes</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
            {upcoming.length ? 'On the plan' : `Nothing planned · today is ${DAYS.find((day) => day.id === today)?.label}`}
          </p>
          {upcoming.length === 0 ? (
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">Add breakfast, lunch, or dinner and the shopping list updates with the servings you choose.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {upcoming.map((entry) => (
                <li key={`${entry.day}-${entry.meal}`} className="flex items-center justify-between gap-3 rounded-2xl border border-divider bg-canvas/70 px-4 py-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-mkt-teal">
                      {DAYS.find((day) => day.id === entry.day)?.label} · {MEALS.find((meal) => meal.id === entry.meal)?.label}
                    </p>
                    <Link to={`/recipe/${entry.recipe.slug}`} className="font-bold text-ink hover:text-primary">{entry.recipe.title}</Link>
                  </div>
                  <span className="text-sm font-semibold text-ink-muted">{entry.servings} srv</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default KitchenStrip
