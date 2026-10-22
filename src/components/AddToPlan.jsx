import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useKitchen } from '../kitchen/KitchenContext'
import { DAYS, MEALS, todayId } from '../utils/recipeLogic'

function AddToPlan({ slug, servings }) {
  const { setSlot } = useKitchen()
  const [day, setDay] = useState(todayId())
  const [meal, setMeal] = useState('dinner')
  const [message, setMessage] = useState('')

  const add = () => {
    setSlot(day, meal, { slug, servings })
    const dayLabel = DAYS.find((item) => item.id === day)?.label
    const mealLabel = MEALS.find((item) => item.id === meal)?.label
    setMessage(`Added to ${dayLabel} ${mealLabel.toLowerCase()} for ${servings} ${servings === 1 ? 'serving' : 'servings'}.`)
  }

  return (
    <div className="rounded-3xl border border-divider bg-white p-4 shadow-card">
      <h2 className="text-lg font-extrabold text-ink">Add to this week</h2>
      <p className="mt-1 text-sm text-ink-muted">The shopping list uses these servings.</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="flex-1 text-xs font-bold uppercase tracking-wide text-ink-muted">
          Day
          <select className="mt-1 h-11 w-full rounded-full border border-ink/10 bg-canvas px-3 text-sm font-semibold normal-case tracking-normal text-ink" value={day} onChange={(event) => setDay(event.target.value)}>
            {DAYS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <label className="flex-1 text-xs font-bold uppercase tracking-wide text-ink-muted">
          Meal
          <select className="mt-1 h-11 w-full rounded-full border border-ink/10 bg-canvas px-3 text-sm font-semibold normal-case tracking-normal text-ink" value={meal} onChange={(event) => setMeal(event.target.value)}>
            {MEALS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
      </div>
      <button type="button" className="mt-4 h-11 rounded-full bg-ink px-5 text-sm font-bold text-white" onClick={add}>
        Add to plan
      </button>
      {message && (
        <p className="mt-3 text-sm font-semibold text-mkt-emerald-deep">
          {message}{' '}
          <Link to="/plan" className="underline">Open the planner</Link>
        </p>
      )}
    </div>
  )
}

export default AddToPlan
