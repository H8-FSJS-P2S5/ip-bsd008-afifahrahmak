
export default function Hero({ recipe }) {

    return (<>
    <div className="min-h-screen grid grid-cols-4">
        <div className="relative -z-50">
            <ul className="sticky top-24">
                {/* carbs,
                protein,
                fat,
                sugar,
                fiber,
                sodium,
                cholesterol, */}
                <li className="text-bold">Nutrition Facts (Per Serving)</li>
                <li>Calories: {recipe.calories}</li>
                <li>Carbohydrates: {recipe.carbs} g</li>
                <li>Protein: {recipe.protein} g</li>
                <li>Fat: {recipe.fat} g</li>
                <li>Sugar: {recipe.sugar} g</li>
                <li>Fiber: {recipe.fiber} g</li>
                <li>Sodium: {recipe.sodium} mg</li>
                <li>Cholesterol: {recipe.cholesterol} mg</li>
            </ul>
        </div>

        <div className="flex-col lg:flex-row col-span-3 pl-10 pr-16 border-l-2">
            <div>
                <img src={recipe.imageUrl} className="max-w-sm rounded-lg shadow-2xl my-4" />
                <h1 className="text-3xl font-bold my-4">{recipe.name}</h1>
            </div>
            <p className="py-6 [&>a]:text-blue-600" dangerouslySetInnerHTML={{ __html: recipe?.summary || '-'}}></p>
            <p className="text-bold pt-6">Ingredients:</p>
            <p>{recipe.ingredients ? recipe.ingredients : "-"}</p>
            <p className="text-bold pt-6">Instructions:</p>
            <p>{recipe.instructions ? recipe.instructions : "-"}</p>
        </div>
    </div>
    </>)
}