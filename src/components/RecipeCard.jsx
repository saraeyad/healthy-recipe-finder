import { useNavigate } from 'react-router-dom'

function RecipeCard({ recipe }) {
  const navigate = useNavigate()

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    navigate(`/recipe/${recipe.slug}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className="bg-white p-2 flex flex-col gap-4 text-center rounded-[10px] xl:w-[376px] shadow-[0_8px_16px_-9px_rgba(22,58,52,0.16)] focus-visible:ring-2 focus-visible:ring-orange-500 outline-none cursor-pointer animate-fadeIn transition-all duration-300"
      style={{ animationDelay: `${recipe.id * 100}ms` }}
      tabIndex={0}
      role="group"
      aria-label={`Recipe card for ${recipe.title}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="recipeTop flex flex-col gap-4">
        <picture>
          <source media="(min-width: 1024px)" srcSet={recipe.image.large} />
          <img
            src={recipe.image.small}
            alt={recipe.title}
            loading="lazy"
            className="w-full object-cover rounded-[10px] max-h-[300px] md:max-h-[450px] lg:max-h-[300px]"
          />
        </picture>

        <div className="recipeInfo px-2 text-start">
          <div className="desciption mb-4">
            <h3 className="mb-2.5 text-preset-5">{recipe.title}</h3>
            <p className="text-preset-9">{recipe.overview}</p>
          </div>
          <ul className="text-preset-9 details grid grid-cols-2 gap-x-4 gap-y-2 items-start w-fit md:grid-cols-3 lg:grid-cols-2">
            <li className="flex items-center gap-1.5">
              <img
                src="/assets/images/icon-servings.svg"
                alt=""
                aria-hidden="true"
              />
              Servings: {recipe.servings}
            </li>
            <li className="flex items-center gap-1.5">
              <img
                src="/assets/images/icon-prep-time.svg"
                alt=""
                aria-hidden="true"
              />
              Prep: {recipe.prepMinutes} mins
            </li>
            <li className="flex items-center gap-1.5">
              <img
                src="/assets/images/icon-cook-time.svg"
                alt=""
                aria-hidden="true"
              />
              Cook: {recipe.cookMinutes} mins
            </li>
          </ul>
        </div>
      </div>
      <button
        className="text-preset-8 bg-neutral-900 text-white rounded-full px-8 py-3 mt-auto font-bold hover:bg-neutral-600 transition duration-300 ease-in"
        onClick={(e) => {
          e.stopPropagation()
          handleClick()
        }}
      >
        View Recipe
      </button>
    </div>
  )
}

export default RecipeCard

