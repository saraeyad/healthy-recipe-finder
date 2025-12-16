
function RecipeIngredients({ ingredients }) {
  return (
    <div>
      <h2 className="text-preset-4 mb-4">Ingredients:</h2>
      <ul className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-center gap-2">
                    <img
                      src="/assets/images/icon-bullet-point.svg"
              alt=""
              className="w-6 h-6"
              aria-hidden="true"
            />
            <span>{ingredient}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecipeIngredients

