import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecipes } from '../hooks/useRecipes'
import { useKitchen } from '../kitchen/KitchenContext'
import Eyebrow from '../components/ui/Eyebrow'
import LoadingState from '../components/LoadingState'
import ServingsControl from '../components/ServingsControl'
import { MEALS, buildShoppingList, planEntries, todayId, weekOf } from '../utils/recipeLogic'

const MEAL_TONE = {
  breakfast: 'bg-status-attention',
  lunch: 'bg-mkt-mint',
  dinner: 'bg-primary',
}

function Planner() {
  const { recipes, loading } = useRecipes()
  const { plan, setSlot, clearPlan, checks, toggleCheck, clearChecks } = useKitchen()
  const [copyState, setCopyState] = useState('')
  const [selectedDay, setSelectedDay] = useState(todayId)
  const [selectedMeal, setSelectedMeal] = useState('dinner')
  const week = weekOf()
  const today = week.days.find((day) => day.isToday)
  const bySlug = new Map(recipes.map((recipe) => [recipe.slug, recipe]))
  const entries = planEntries(plan)
  const list = buildShoppingList(entries, recipes)
  const remaining = list.filter((item) => !checks.includes(item.id))
  const bought = list.length - remaining.length
  const activeDay = week.days.find((day) => day.id === selectedDay) || week.days[0]
  const activeMeal = MEALS.find((meal) => meal.id === selectedMeal) || MEALS[2]
  const slot = plan?.[activeDay.id]?.[activeMeal.id] || null
  const chosen = slot ? bySlug.get(slot.slug) : null

  const assign = (slug) => {
    if (!slug) return
    const recipe = bySlug.get(slug)
    setSlot(activeDay.id, activeMeal.id, {
      slug,
      servings: slot?.servings || recipe?.servings || 1,
    })
  }

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

  const openSlot = (dayId, mealId) => {
    setSelectedDay(dayId)
    setSelectedMeal(mealId)
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
            One week on the calendar. Pick a meal, set the servings, and take the list with you.
          </p>
        </div>

        {loading ? (
          <LoadingState message="Loading the planner..." />
        ) : (
          <div className="mt-10 space-y-6">
            <div className="rounded-[2rem] border border-white/80 bg-white p-4 shadow-float sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-mkt-teal">This week</p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-ink">{week.range}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="rounded-full bg-canvas px-3 py-1.5 text-sm font-semibold text-ink-muted">
                    {entries.length} meal{entries.length === 1 ? '' : 's'}
                    {today ? ` · today is ${today.label}` : ''}
                  </p>
                  <button
                    type="button"
                    className="h-10 rounded-full border border-ink/10 px-4 text-sm font-bold text-ink disabled:opacity-40"
                    disabled={!entries.length}
                    onClick={clearPlan}
                  >
                    Clear week
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-7 gap-1 sm:gap-2 lg:hidden">
                {week.days.map((day) => {
                  const selected = day.id === activeDay.id
                  return (
                    <div key={day.id} className={`rounded-2xl px-0.5 pb-1 ${selected ? 'bg-canvas ring-1 ring-primary/15' : ''}`}>
                      <button
                        type="button"
                        className="flex w-full flex-col items-center rounded-xl py-1"
                        aria-pressed={selected}
                        onClick={() => setSelectedDay(day.id)}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wide text-ink-muted">{day.short}</span>
                        <span className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold ${day.isToday ? 'bg-primary text-white shadow-brand' : 'text-ink'}`}>
                          {day.date}
                        </span>
                      </button>
                      <div className="space-y-1">
                        {MEALS.map((meal) => {
                          const mealSlot = plan[day.id][meal.id]
                          const recipe = mealSlot ? bySlug.get(mealSlot.slug) : null
                          const active = selected && meal.id === activeMeal.id
                          return (
                            <button
                              key={meal.id}
                              type="button"
                              aria-pressed={active}
                              aria-label={`${day.label} ${meal.label}${recipe ? `, ${recipe.title}` : ', empty'}`}
                              className={`flex h-6 w-full items-center justify-center rounded-lg ${active ? 'bg-white shadow-sm' : ''}`}
                              onClick={() => openSlot(day.id, meal.id)}
                            >
                              <span className={`h-1.5 w-5 rounded-full ${recipe ? MEAL_TONE[meal.id] : 'bg-ink/15'}`} />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-[11px] font-bold uppercase tracking-wide text-ink-muted lg:hidden">
                {MEALS.map((meal) => (
                  <span key={meal.id} className="inline-flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${MEAL_TONE[meal.id]}`} />
                    {meal.label}
                  </span>
                ))}
              </div>

              <div className="mt-6 hidden lg:grid lg:grid-cols-7 lg:gap-2">
                  {week.days.map((day) => {
                    const selected = day.id === activeDay.id
                    return (
                      <div
                        key={day.id}
                        className={`rounded-2xl p-2 ${selected ? 'bg-canvas ring-1 ring-primary/15' : ''}`}
                      >
                        <button
                          type="button"
                          className="flex w-full flex-col items-center rounded-xl py-1"
                          aria-pressed={selected}
                          onClick={() => setSelectedDay(day.id)}
                        >
                          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">{day.short}</span>
                          <span className={`mt-1 flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold ${day.isToday ? 'bg-primary text-white shadow-brand' : 'text-ink'}`}>
                            {day.date}
                          </span>
                        </button>
                        <div className="mt-2 space-y-1.5">
                          {MEALS.map((meal) => {
                            const mealSlot = plan[day.id][meal.id]
                            const recipe = mealSlot ? bySlug.get(mealSlot.slug) : null
                            const active = selected && meal.id === activeMeal.id
                            return (
                              <button
                                key={meal.id}
                                type="button"
                                aria-pressed={active}
                                aria-label={`${day.label} ${meal.label}${recipe ? `, ${recipe.title}` : ', empty'}`}
                                className={`flex w-full items-center gap-1.5 rounded-xl border px-1.5 py-1.5 text-left transition ${
                                  active
                                    ? 'border-primary/30 bg-white shadow-card'
                                    : 'border-transparent bg-white/70 hover:border-ink/10 hover:bg-white'
                                }`}
                                onClick={() => openSlot(day.id, meal.id)}
                              >
                                <span className={`h-8 w-1 shrink-0 rounded-full ${MEAL_TONE[meal.id]}`} />
                                {recipe ? (
                                  <>
                                    <img src={recipe.image.small} alt="" className="h-8 w-8 shrink-0 rounded-lg object-cover" />
                                    <span className="min-w-0">
                                      <span className="block text-[9px] font-bold uppercase tracking-wide text-ink-muted">{meal.label}</span>
                                      <span className="line-clamp-2 text-[11px] font-bold leading-tight text-ink">{recipe.title}</span>
                                    </span>
                                  </>
                                ) : (
                                  <span className="min-w-0 py-1">
                                    <span className="block text-[9px] font-bold uppercase tracking-wide text-ink-muted">{meal.label}</span>
                                    <span className="text-[11px] font-semibold text-ink-muted">Add</span>
                                  </span>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
              <section className="rounded-[2rem] border border-white/80 bg-white p-5 shadow-card sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-mkt-teal">
                      {activeDay.label} {activeDay.date}
                      {activeDay.isToday ? ' · Today' : ''}
                    </p>
                    <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">{activeMeal.label}</h2>
                  </div>
                  <div className="flex gap-1 rounded-full bg-canvas p-1">
                    {MEALS.map((meal) => (
                      <button
                        key={meal.id}
                        type="button"
                        aria-pressed={meal.id === activeMeal.id}
                        className={`h-9 rounded-full px-3 text-xs font-bold ${
                          meal.id === activeMeal.id ? 'bg-white text-ink shadow-sm' : 'text-ink-muted'
                        }`}
                        onClick={() => setSelectedMeal(meal.id)}
                      >
                        {meal.label}
                      </button>
                    ))}
                  </div>
                </div>

                {chosen ? (
                  <div className="mt-5 overflow-hidden rounded-3xl border border-divider bg-canvas/50">
                    <div className="grid sm:grid-cols-[9.5rem_minmax(0,1fr)]">
                      <img src={chosen.image.large} alt="" className="h-40 w-full object-cover sm:h-full" />
                      <div className="p-4 sm:p-5">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-ink-muted">{slot.servings} {slot.servings === 1 ? 'serving' : 'servings'}</p>
                        <Link to={`/recipe/${chosen.slug}`} className="mt-1 block text-xl font-extrabold leading-snug text-ink hover:text-primary">
                          {chosen.title}
                        </Link>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{chosen.overview}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 rounded-3xl border border-dashed border-ink/15 bg-canvas/60 px-5 py-8 text-center">
                    <p className="text-sm font-semibold text-ink-muted">
                      {slot && !chosen ? 'This recipe is no longer in the library.' : `Nothing planned for ${activeDay.label} ${activeMeal.label.toLowerCase()}.`}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
                  <label className="min-w-[16rem] flex-1 text-xs font-bold uppercase tracking-wide text-ink-muted">
                    Recipe
                    <select
                      className="mt-1.5 h-12 w-full rounded-2xl border border-ink/10 bg-canvas px-3 text-sm font-semibold normal-case tracking-normal text-ink"
                      value={slot?.slug || ''}
                      onChange={(event) => assign(event.target.value)}
                    >
                      {!slot && <option value="">Choose a recipe</option>}
                      {recipes.map((item) => (
                        <option key={item.id} value={item.slug}>{item.title}</option>
                      ))}
                    </select>
                  </label>
                  {slot && chosen && (
                    <ServingsControl
                      value={slot.servings}
                      onChange={(servings) => setSlot(activeDay.id, activeMeal.id, { slug: slot.slug, servings })}
                    />
                  )}
                  {slot && (
                    <button
                      type="button"
                      className="h-12 rounded-full border border-ink/10 px-5 text-sm font-bold text-ink"
                      onClick={() => setSlot(activeDay.id, activeMeal.id, null)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </section>

              <aside className="rounded-[2rem] border border-white/80 bg-white p-5 shadow-float sm:p-6 lg:sticky lg:top-28">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-mkt-teal">{week.range}</p>
                    <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">Shopping list</h2>
                  </div>
                  <p className="text-sm font-semibold text-ink-muted">
                    {list.length ? `${bought}/${list.length}` : '0'}
                  </p>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-divider">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-mkt-mint transition-[width] duration-500"
                    style={{ width: `${list.length ? (bought / list.length) * 100 : 0}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-ink-muted">
                  {list.length
                    ? `${remaining.length} item${remaining.length === 1 ? '' : 's'} still to buy`
                    : 'Add a meal on the calendar and the list builds itself.'}
                </p>
                <ul className="mt-4 space-y-2">
                  {list.map((item) => {
                    const checked = checks.includes(item.id)
                    return (
                      <li key={item.id}>
                        <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-3 py-2.5 ${checked ? 'border-transparent bg-canvas' : 'border-divider bg-white'}`}>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={checked}
                            onChange={() => toggleCheck(item.id)}
                          />
                          <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${checked ? 'border-primary bg-primary text-white' : 'border-ink/15 bg-white'}`}>
                            {checked && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                                <path d="M5 12.5 10 17l9-10" />
                              </svg>
                            )}
                          </span>
                          <span>
                            <span className={`block text-sm font-semibold ${checked ? 'text-ink-muted line-through' : 'text-ink'}`}>{item.label}</span>
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
          </div>
        )}
      </section>
    </div>
  )
}

export default Planner
