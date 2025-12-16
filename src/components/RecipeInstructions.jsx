
function RecipeInstructions({ instructions }) {
  return (
    <div>
      <h2 className="text-preset-4 mb-4">Instructions:</h2>
      <ul className="space-y-2">
        {instructions.map((instruction, index) => (
          <li key={index} className="flex items-center gap-2">
                    <img
                      src="/assets/images/icon-bullet-point.svg"
              alt=""
              className="w-6 h-6"
              aria-hidden="true"
            />
            <p>{instruction}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecipeInstructions

