import RecipeCard from './RecipeCard'

function RecipeGrid({ recipes, loading }) {
  if (loading) {
    return (
      <p className="col-span-full text-center text-neutral-600">
        Loading recipes...
      </p>
    )
  }

  if (recipes.length === 0) {
    return (
      <p className="col-span-full text-center text-preset-7">
        No recipes found.
      </p>
    )
  }

  return (
    <>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </>
  )
}

export default RecipeGrid

