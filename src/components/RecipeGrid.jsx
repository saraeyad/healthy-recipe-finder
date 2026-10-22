import RecipeCard from './RecipeCard'
import Reveal from './ui/Reveal'

function RecipeGrid({ recipes, loading }) {
  if (loading) {
    return (
      <p className="col-span-full py-16 text-center text-ink-muted">Loading recipes…</p>
    )
  }

  if (recipes.length === 0) {
    return (
      <div className="col-span-full rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
        <p className="text-lg font-extrabold text-ink">No recipes found</p>
        <p className="mt-2 text-sm text-ink-muted">Try a different name, ingredient, or time.</p>
      </div>
    )
  }

  return (
    <>
      {recipes.map((recipe, index) => (
        <Reveal key={recipe.id} variant="scale" delay={(index % 3) * 90} className="h-full">
          <RecipeCard recipe={recipe} />
        </Reveal>
      ))}
    </>
  )
}

export default RecipeGrid
