import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { getRecipeBySlug, fetchRecipes } from '../services/recipeService'
import RecipeCard from '../components/RecipeCard'
import RecipeInfo from '../components/RecipeInfo'
import RecipeIngredients from '../components/RecipeIngredients'
import RecipeInstructions from '../components/RecipeInstructions'
import Breadcrumb from '../components/Breadcrumb'
import LoadingState from '../components/LoadingState'
import ErrorMessage from '../components/ErrorMessage'
import Reveal from '../components/ui/Reveal'
import FavoriteButton from '../components/FavoriteButton'
import ServingsControl from '../components/ServingsControl'
import CookMode from '../components/CookMode'
import AddToPlan from '../components/AddToPlan'
import { useParallax } from '../hooks/useParallax'
import { useKitchen } from '../kitchen/KitchenContext'
import { classifyRecipe, dietLabel, relatedRecipes, scaleIngredients } from '../utils/recipeLogic'

function RecipeDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { remember, markCooked, cooked } = useKitchen()
  const [recipe, setRecipe] = useState(null)
  const [moreRecipes, setMoreRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [servings, setServings] = useState(1)
  const [cooking, setCooking] = useState(false)
  const [frameRef, offset] = useParallax(40)

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true)
        setError(null)
        const foundRecipe = await getRecipeBySlug(slug)

        if (foundRecipe) {
          setRecipe(foundRecipe)
          setServings(foundRecipe.servings)
          remember(foundRecipe.slug)
          const allRecipes = await fetchRecipes()
          setMoreRecipes(relatedRecipes(allRecipes, foundRecipe, 3))
        } else {
          setError('Recipe not found')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadRecipe()
  }, [slug, remember])

  if (loading) {
    return (
      <div className="bg-canvas pt-32">
        <LoadingState message="Loading recipe..." />
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="bg-canvas pt-32">
        <ErrorMessage
          message={error || 'Recipe not found.'}
          showBackButton
          backButtonText="Browse all recipes"
          backButtonPath="/recipes"
        />
      </div>
    )
  }

  const meta = classifyRecipe(recipe)
  const scaled = scaleIngredients(recipe.ingredients, recipe.servings, servings)
  const history = cooked.filter((entry) => entry.slug === recipe.slug)
  const scaleNote = servings === recipe.servings
    ? `Written for ${recipe.servings} ${recipe.servings === 1 ? 'serving' : 'servings'}.`
    : `Scaled from ${recipe.servings} to ${servings} servings. Salt and “to taste” lines stay as written.`

  return (
    <div className="bg-canvas pt-28 lg:pt-32">
      {cooking && (
        <CookMode
          recipe={recipe}
          servings={servings}
          onClose={() => setCooking(false)}
          onCooked={() => {
            if (!user) {
              navigate(`/login?next=${encodeURIComponent(`/recipe/${recipe.slug}`)}`)
              return false
            }
            markCooked(recipe.slug, servings)
            return true
          }}
        />
      )}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumb
          items={[
            { path: '/recipes', label: 'Recipes' },
            { label: recipe.title },
          ]}
        />

        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28">
            <div ref={frameRef} className="relative overflow-hidden rounded-[2rem] shadow-float ring-1 ring-ink/[0.05]">
              <img
                src={recipe.image.large}
                alt={recipe.title}
                className="w-full object-cover"
                style={{ transform: `translateY(${offset * 0.4}px) scale(1.06)` }}
              />
              <FavoriteButton slug={recipe.slug} className="absolute right-4 top-4 h-12 w-12" />
            </div>
          </div>

          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-mkt-mint-bg px-3 py-1 text-xs font-bold text-mkt-emerald-deep">{meta.total} min · {meta.difficulty}</span>
              {meta.diets.map((diet) => (
                <span key={diet} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-mkt-teal ring-1 ring-line">{dietLabel(diet)}</span>
              ))}
            </div>
            <h1 className="mt-3 text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-ink sm:text-5xl">
              {recipe.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-mkt-body sm:text-lg">{recipe.overview}</p>
            {history.length > 0 && (
              <p className="mt-3 text-sm font-semibold text-ink-muted">
                Cooked {history.length} {history.length === 1 ? 'time' : 'times'} · last {new Date(history[0].at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            )}
            <div className="mt-6">
              <RecipeInfo recipe={recipe} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ServingsControl value={servings} onChange={setServings} />
              <button type="button" className="h-10 rounded-full bg-gradient-to-br from-primary to-mkt-teal px-5 text-sm font-bold text-white shadow-brand" onClick={() => setCooking(true)}>
                Start cooking
              </button>
            </div>
            <div className="mt-8 space-y-8">
              <RecipeIngredients ingredients={scaled} note={scaleNote} />
              <RecipeInstructions instructions={recipe.instructions} />
              <AddToPlan slug={recipe.slug} servings={servings} />
            </div>
          </Reveal>
        </div>
      </section>

      {moreRecipes.length > 0 && (
        <section className="border-t border-divider bg-white/60 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Similar recipes</h2>
            <p className="mb-6 mt-1 text-sm text-ink-muted">Ranked by shared ingredients and a similar total time.</p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {moreRecipes.map((item) => (
                <RecipeCard key={item.id} recipe={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default RecipeDetail
