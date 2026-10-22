import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { greeting } from '../auth/authLogic'
import { useKitchen } from '../kitchen/KitchenContext'
import { useRecipes } from '../hooks/useRecipes'
import Eyebrow from '../components/ui/Eyebrow'
import LoadingState from '../components/LoadingState'
import { DAYS, MEALS, buildShoppingList, planEntries, weekOf } from '../utils/recipeLogic'

const MEAL_TONE = {
  breakfast: 'bg-status-attention',
  lunch: 'bg-mkt-mint',
  dinner: 'bg-primary',
}

function Stat({ label, value, to }) {
  return (
    <Link to={to} className="rounded-3xl border border-white/80 bg-white p-4 shadow-card transition hover:-translate-y-0.5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-mkt-teal">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-ink">{value}</p>
    </Link>
  )
}

function Dashboard() {
  const { user } = useAuth()
  const { recipes, loading } = useRecipes()
  const { plan, favorites, cooked, checks, toggleCheck } = useKitchen()
  const week = weekOf()
  const bySlug = new Map(recipes.map((recipe) => [recipe.slug, recipe]))
  const entries = planEntries(plan)
  const list = buildShoppingList(entries, recipes)
  const remaining = list.filter((item) => !checks.includes(item.id))
  const saved = favorites.map((slug) => bySlug.get(slug)).filter(Boolean).slice(0, 3)
  const cookedRows = cooked
    .map((entry) => ({ ...entry, recipe: bySlug.get(entry.slug) }))
    .filter((entry) => entry.recipe)
    .slice(0, 4)

  return (
    <div>
      <section className="mx-auto max-w-6xl pb-12">
        <div className="max-w-3xl">
          <Eyebrow>Overview</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-ink sm:text-5xl">
            {greeting()}, {user.name}.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Your week, shopping list, saved recipes, and cooked meals are here.
          </p>
        </div>

        {loading ? (
          <LoadingState message="Loading your kitchen..." />
        ) : (
          <div className="mt-10 space-y-6">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Stat label="Meals planned" value={entries.length} to="/plan" />
              <Stat label="Still to buy" value={remaining.length} to="/plan" />
              <Stat label="Saved" value={favorites.length} to="/saved" />
              <Stat label="Cooked" value={cooked.length} to="/saved" />
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
              <section className="rounded-[2rem] border border-white/80 bg-white p-5 shadow-float sm:p-6">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-mkt-teal">This week</p>
                    <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">{week.range}</h2>
                  </div>
                  <Link to="/plan" className="text-sm font-bold text-primary">Open calendar</Link>
                </div>
                <div className="mt-5 grid grid-cols-7 gap-1 sm:gap-2">
                  {week.days.map((day) => (
                    <Link
                      key={day.id}
                      to="/plan"
                      className={`rounded-2xl px-0.5 pb-2 text-center ${day.isToday ? 'bg-canvas ring-1 ring-primary/15' : ''}`}
                    >
                      <span className="block text-[10px] font-bold uppercase tracking-wide text-ink-muted">{day.short}</span>
                      <span className={`mx-auto mt-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold ${day.isToday ? 'bg-primary text-white shadow-brand' : 'text-ink'}`}>
                        {day.date}
                      </span>
                      <span className="mt-2 flex flex-col items-center gap-1">
                        {MEALS.map((meal) => {
                          const slot = plan?.[day.id]?.[meal.id]
                          return <span key={meal.id} className={`h-1.5 w-5 rounded-full ${slot ? MEAL_TONE[meal.id] : 'bg-ink/15'}`} />
                        })}
                      </span>
                    </Link>
                  ))}
                </div>
                <ul className="mt-5 space-y-2">
                  {entries.length === 0 ? (
                    <li className="text-sm text-ink-muted">Nothing is on the calendar yet.</li>
                  ) : entries.slice(0, 4).map((entry) => {
                    const recipe = bySlug.get(entry.slug)
                    if (!recipe) return null
                    return (
                      <li key={`${entry.day}-${entry.meal}`} className="flex items-center justify-between gap-3 rounded-2xl bg-canvas px-4 py-3">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wide text-mkt-teal">
                            {DAYS.find((day) => day.id === entry.day)?.label} · {MEALS.find((meal) => meal.id === entry.meal)?.label}
                          </p>
                          <Link to={`/recipe/${recipe.slug}`} className="font-bold text-ink hover:text-primary">{recipe.title}</Link>
                        </div>
                        <span className="text-sm font-semibold text-ink-muted">{entry.servings} srv</span>
                      </li>
                    )
                  })}
                </ul>
              </section>

              <section className="rounded-[2rem] border border-white/80 bg-white p-5 shadow-card sm:p-6">
                <div className="flex items-end justify-between gap-3">
                  <h2 className="text-2xl font-extrabold tracking-tight text-ink">Shopping list</h2>
                  <Link to="/plan" className="text-sm font-bold text-primary">Full list</Link>
                </div>
                <p className="mt-2 text-sm text-ink-muted">
                  {list.length ? `${remaining.length} still to buy` : 'Plan a meal and the list builds itself.'}
                </p>
                <ul className="mt-4 space-y-2">
                  {remaining.slice(0, 5).map((item) => (
                    <li key={item.id}>
                      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-divider px-3 py-2.5">
                        <input type="checkbox" className="sr-only" checked={false} onChange={() => toggleCheck(item.id)} />
                        <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full border border-ink/15" />
                        <span className="text-sm font-semibold text-ink">{item.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                {remaining.length > 5 && (
                  <p className="mt-3 text-sm font-semibold text-ink-muted">{remaining.length - 5} more on the calendar.</p>
                )}
              </section>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-2">
              <section className="rounded-[2rem] border border-white/80 bg-white p-5 shadow-card sm:p-6">
                <div className="flex items-end justify-between gap-3">
                  <h2 className="text-2xl font-extrabold tracking-tight text-ink">Saved recipes</h2>
                  <Link to="/saved" className="text-sm font-bold text-primary">See all</Link>
                </div>
                {saved.length === 0 ? (
                  <p className="mt-4 text-sm text-ink-muted">Tap the heart on a recipe and it will show up here.</p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {saved.map((recipe) => (
                      <li key={recipe.slug}>
                        <Link to={`/recipe/${recipe.slug}`} className="flex items-center gap-3 rounded-2xl bg-canvas p-2">
                          <img src={recipe.image.small} alt="" className="h-16 w-16 rounded-xl object-cover" />
                          <span className="font-bold text-ink">{recipe.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="rounded-[2rem] border border-white/80 bg-white p-5 shadow-card sm:p-6">
                <div className="flex items-end justify-between gap-3">
                  <h2 className="text-2xl font-extrabold tracking-tight text-ink">Cooked</h2>
                  <Link to="/saved" className="text-sm font-bold text-primary">History</Link>
                </div>
                {cookedRows.length === 0 ? (
                  <p className="mt-4 text-sm text-ink-muted">Finish cook mode with “I cooked this” and the meal is recorded.</p>
                ) : (
                  <ul className="mt-4 divide-y divide-divider">
                    {cookedRows.map((entry) => (
                      <li key={`${entry.slug}-${entry.at}`} className="flex items-center justify-between gap-3 py-3">
                        <Link to={`/recipe/${entry.recipe.slug}`} className="font-bold text-ink hover:text-primary">{entry.recipe.title}</Link>
                        <span className="text-sm text-ink-muted">{entry.servings} {entry.servings === 1 ? 'serving' : 'servings'}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Dashboard
