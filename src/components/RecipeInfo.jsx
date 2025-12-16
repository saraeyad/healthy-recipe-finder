
function RecipeInfo({ recipe }) {
  return (
    <ul className="text-preset-7 grid grid-cols-2 gap-x-4 gap-y-2 items-start w-fit md:grid-cols-3">
      <li className="flex items-center gap-1.5">
        <img src="/assets/images/icon-servings.svg" alt="" aria-hidden="true" />
              Servings: {recipe.servings}
            </li>
            <li className="flex items-center gap-1.5">
              <img src="/assets/images/icon-prep-time.svg" alt="" aria-hidden="true" />
              Prep: {recipe.prepMinutes} mins
            </li>
            <li className="flex items-center gap-1.5">
              <img src="/assets/images/icon-cook-time.svg" alt="" aria-hidden="true" />
        Cook: {recipe.cookMinutes} mins
      </li>
    </ul>
  )
}

export default RecipeInfo

