function RecipeInfo({ recipe }) {
  const items = [
    ['/assets/images/icon-servings.svg', `Servings: ${recipe.servings}`],
    ['/assets/images/icon-prep-time.svg', `Prep: ${recipe.prepMinutes} mins`],
    ['/assets/images/icon-cook-time.svg', `Cook: ${recipe.cookMinutes} mins`],
  ]

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map(([icon, label]) => (
        <li key={label} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-mkt-teal ring-1 ring-line">
          <img src={icon} alt="" aria-hidden="true" className="h-4 w-4" />
          {label}
        </li>
      ))}
    </ul>
  )
}

export default RecipeInfo
