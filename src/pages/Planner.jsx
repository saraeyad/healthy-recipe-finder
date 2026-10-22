import { Link } from 'react-router-dom'
import { useRecipes } from '../hooks/useRecipes'
import { useKitchen } from '../kitchen/KitchenContext'
import Eyebrow from '../components/ui/Eyebrow'
import LoadingState from '../components/LoadingState'
import ServingsControl from '../components/ServingsControl'
import { DAYS, MEALS, buildShoppingList, planEntries, todayId } from '../utils/recipeLogic'
import { useState } from 'react'

function Planner() {
  const { recipes, loading } = useRecipes()
  const { plan, setSlot, clearPlan, checks, toggleCheck, clearChecks } = useKitchen()
  const [copyState, setCopyState] = useState('')
  const today = todayId()
  const bySlug = new Map(recipes.map((recipe) => [recipe.slug, recipe]))
  const entries = planEntries(plan)
  const list = buildShoppingList(entries, recipes)
  const remaining = list.filter((item) => !checks.includes(item.id))

  const copyList = async () => {
    const text = remaining.length
      ? remaining.map((item) => `- ${item.label}`).join('\n')
      : 'Shopping list is clear.'
    try {
      await navigator.clipboard.writeText(text)
      setCopyState('Copied the remaining items.')
    } catch {
      setCopyState('Clipboard is blocked in this browser. Select the list and copy it manually.')
    }
  }

  return (
    <div className="bg-canvas pt-28 lg:pt-32">
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Eyebrow>The week</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-ink sm:text-5xl">
            Plan meals. Leave with a list.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Assign any recipe to a day and meal. The shopping list scales to the servings you set and merges matching ingredients.
          </p>
        </div>

        {loading ? (
          <LoadingState message="Loading the planner..." />
        ) : (
          <div className="mt-10 grid items-start gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-ink-muted">
                  {entries.length} meal{entries.length === 1 ? '' : 's'} planned
                  {today ? ` · today is ${DAYS.find((day) => day.id === today)?.label}` : ''}
                </p>
                <button type="button" className="text-sm font-bold text-ink-muted underline disabled:opacity-40" disabled={!entries.length} onClick={clearPlan}>
                  Clear the week
                </button>
              </div>
              {DAYS.map((day) => (
                <section key={day.id} className={`rounded-3xl border bg-white p-4 shadow-card sm:p-5 ${day.id === today ? 'border-primary/40' : 'border-ink/[0.06]'}`}>
                  <h2 className="text-lg font-extrabold text-ink">
                    {day.label}
                    {day.id === today && <span className="ml-2 text-xs font-bold uppercase tracking-wide text-primary">Today</span>}
                  </h2>
                  <div className="mt-4 grid gap-3 lg:grid-cols-3">
                    {MEALS.map((meal) => {
                      const slot = plan[day.id][meal.id]
                      const recipe = slot ? bySlug.get(slot.slug) : null
                      return (
                        <div key={meal.id} className="rounded-2xl border border-divider bg-canvas/60 p-3">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-ink-muted">{meal.label}</p>
                          {slot && recipe ? (
                            <div className="mt-2">
                              <Link to={`/recipe/${recipe.slug}`} className="font-bold text-ink hover:text-primary">{recipe.title}</Link>
                              <div className="mt-3">
                                <ServingsControl
                                  value={slot.servings}
                                  onChange={(servings) => setSlot(day.id, meal.id, { slug: slot.slug, servings })}
                                />
                              </div>
                              <button type="button" className="mt-2 text-xs font-bold text-ink-muted underline" onClick={() => setSlot(day.id, meal.id, null)}>
                                Remove
                              </button>
                            </div>
                          ) : (
                            <label className="mt-2 block text-sm font-semibold text-ink">
                              <span className="sr-only">{day.label} {meal.label}</span>
                              <select
                                className="h-11 w-full rounded-full border border-ink/10 bg-white px-3"
                                value=""
                                onChange={(event) => {
                                  if (!event.target.value) return
                                  const chosen = bySlug.get(event.target.value)
                                  setSlot(day.id, meal.id, { slug: event.target.value, servings: chosen?.servings || 1 })
                                }}
                              >
                                <option value="">{slot && !recipe ? 'Recipe unavailable' : 'Choose a recipe'}</option>
                                {recipes.map((item) => (
                                  <option key={item.id} value={item.slug}>{item.title}</option>
                                ))}
                              </select>
                            </label>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>

            <aside className="rounded-3xl border border-white/80 bg-white p-5 shadow-float xl:sticky xl:top-28">
              <h2 className="text-xl font-extrabold text-ink">Shopping list</h2>
              <p className="mt-1 text-sm text-ink-muted">
                {list.length
                  ? `${remaining.length} item${remaining.length === 1 ? '' : 's'} still to buy`
                  : 'Add a meal and the list builds itself.'}
              </p>
              <ul className="mt-4 space-y-2">
                {list.map((item) => {
                  const checked = checks.includes(item.id)
                  return (
                    <li key={item.id}>
                      <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-3 py-2.5 ${checked ? 'border-divider bg-canvas text-ink-muted' : 'border-divider bg-white'}`}>
                        <input
                          type="checkbox"
                          className="mt-1 accent-primary"
                          checked={checked}
                          onChange={() => toggleCheck(item.id)}
                        />
                        <span>
                          <span className={`block text-sm font-semibold ${checked ? 'line-through' : 'text-ink'}`}>{item.label}</span>
                          <span className="text-[11px] text-ink-muted">{item.recipes.join(' · ')}</span>
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className="h-10 rounded-full bg-gradient-to-br from-primary to-mkt-teal px-4 text-sm font-bold text-white shadow-brand disabled:opacity-40" disabled={!list.length} onClick={copyList}>
                  Copy remaining
                </button>
                <button type="button" className="h-10 rounded-full border border-ink/10 px-4 text-sm font-bold text-ink disabled:opacity-40" disabled={!checks.length} onClick={clearChecks}>
                  Uncheck all
                </button>
              </div>
              {copyState && <p className="mt-3 text-sm font-semibold text-mkt-emerald-deep">{copyState}</p>}
            </aside>
          </div>
        )}
      </section>
    </div>
  )
}

export default Planner
