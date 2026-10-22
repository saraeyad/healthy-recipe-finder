function RecipeInstructions({ instructions }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-extrabold text-ink">Instructions</h2>
      <ol className="space-y-4">
        {instructions.map((instruction, index) => (
          <li key={instruction} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-mkt-teal text-sm font-bold text-white shadow-brand">
              {index + 1}
            </span>
            <p className="pt-1 text-base leading-relaxed text-mkt-body">{instruction}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default RecipeInstructions
