import { useNavigate } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'
import { classifyRecipe, dietLabel } from '../utils/recipeLogic'

function RecipeCard({ recipe }) {
  const navigate = useNavigate()
  const meta = classifyRecipe(recipe)

  const open = () => {
    navigate(`/recipe/${recipe.slug}`)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      open()
    }
  }

  return (
    <article
      className="group flex h-full cursor-pointer flex-col rounded-3xl border border-ink/[0.07] bg-white p-3 text-start shadow-card outline-none transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-primary"
      tabIndex={0}
      aria-label={`Recipe card for ${recipe.title}`}
      onClick={open}
      onKeyDown={handleKeyDown}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={recipe.image.small}
          alt={recipe.title}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
        <FavoriteButton slug={recipe.slug} className="absolute right-3 top-3" />
      </div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-mkt-mint-bg px-2.5 py-1 text-[11px] font-bold text-mkt-emerald-deep ring-1 ring-mkt-mint-border">
            {meta.total} min
          </span>
          <span className="text-xs font-semibold text-ink-muted">{meta.difficulty}</span>
        </div>
        <h3 className="text-lg font-extrabold leading-snug text-ink">{recipe.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">{recipe.overview}</p>
        <ul className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold text-mkt-teal">
          {meta.diets.slice(0, 3).map((diet) => (
            <li key={diet} className="rounded-full bg-canvas px-2.5 py-1">{dietLabel(diet)}</li>
          ))}
        </ul>
        <button
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-mkt-teal text-sm font-bold text-white shadow-brand transition duration-300 group-hover:-translate-y-0.5"
          onClick={(event) => {
            event.stopPropagation()
            open()
          }}
        >
          View recipe
        </button>
      </div>
    </article>
  )
}

export default RecipeCard
