import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getRecipeBySlug, getRandomRecipes, fetchRecipes } from '../services/recipeService'
import RecipeCard from '../components/RecipeCard'
import RecipeInfo from '../components/RecipeInfo'
import RecipeIngredients from '../components/RecipeIngredients'
import RecipeInstructions from '../components/RecipeInstructions'
import Breadcrumb from '../components/Breadcrumb'
import LoadingState from '../components/LoadingState'
import ErrorMessage from '../components/ErrorMessage'

function RecipeDetail() {
  const { slug } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [moreRecipes, setMoreRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Scroll to top when recipe detail page loads
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true)
        setError(null)
        const foundRecipe = await getRecipeBySlug(slug)

        if (foundRecipe) {
          setRecipe(foundRecipe)
          const allRecipes = await fetchRecipes()
          const randomRecipes = getRandomRecipes(allRecipes, slug, 3)
          setMoreRecipes(randomRecipes)
        } else {
          setError('Recipe not found')
        }
      } catch (err) {
        setError(err.message)
        console.error('Error loading recipe:', err)
      } finally {
        setLoading(false)
      }
    }

    loadRecipe()
  }, [slug])

  if (loading) {
    return (
      <main className="pt-[72px] md:pt-[93px]">
        <section className="py-12 lg:py-16">
          <LoadingState message="Loading recipe..." />
        </section>
      </main>
    )
  }

  if (error || !recipe) {
    return (
      <main className="pt-[72px] md:pt-[93px]">
        <section className="py-12 lg:py-16">
          <ErrorMessage
            message={error || 'Recipe not found.'}
            showBackButton
            backButtonText="Browse all recipes"
            backButtonPath="/recipes"
          />
        </section>
      </main>
    )
  }

  return (
    <main className="pt-[72px] md:pt-[93px]">
      {/* Recipe Details Section */}
      <section className="py-12 lg:py-16">
        <Breadcrumb
          items={[
            { path: '/recipes', label: 'Recipes' },
            { label: recipe.title },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <picture>
            <source media="(min-width: 1024px)" srcSet={recipe.image.large} />
            <img
              src={recipe.image.small}
              alt={recipe.title}
              loading="lazy"
              className="w-full rounded-[10px] object-cover lg:max-w-xl lg:max-h-xl"
            />
          </picture>

          <div className="space-y-5">
            <h1 className="text-preset-2">{recipe.title}</h1>
            <p>{recipe.overview}</p>
            <RecipeInfo recipe={recipe} />
            <RecipeIngredients ingredients={recipe.ingredients} />
            <RecipeInstructions instructions={recipe.instructions} />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t-[1px] border-t-neutral-200"></div>

      {/* More Recipes Section */}
      <section className="py-12 md:py-16">
        <h2 className="text-preset-3 mb-6">More recipes</h2>
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {moreRecipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default RecipeDetail
