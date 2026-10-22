function RecipeIngredients({ ingredients, note }) {
  return (
    <div>
      <h2 className="text-xl font-extrabold text-ink">Ingredients</h2>
      {note ? <p className="mb-4 mt-2 text-sm font-medium text-ink-muted">{note}</p> : <div className="mb-4" />}
      <ul className="space-y-2">
        {ingredients.map((ingredient) => (
          <li key={ingredient} className="flex items-start gap-3 rounded-2xl border border-divider bg-white px-3 py-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-status-on-bg text-status-on">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span className="text-sm font-medium text-ink">{ingredient}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecipeIngredients
