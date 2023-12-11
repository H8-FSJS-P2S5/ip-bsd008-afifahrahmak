if (process.env.NODE_ENV !== "production") require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

async function fetchRecipes() {
    const recipe1 = 716429;
    const recipe2 = 715538;
    const recipe3 = 641679;
    const API_KEY = process.env.SPOONACULAR_KEY;

    try {
        const { data } = await axios.get(
            `https://api.spoonacular.com/recipes/informationBulk?ids=${recipe1},${recipe2},${recipe3}&includeNutrition=true&apiKey=${API_KEY}`
        );

        const recipes = data.map((d) => {
            let instructions;
            if (d.analyzedInstructions) {
                if (d.analyzedInstructions.length != 0) {
                    instructions = d.analyzedInstructions[0].steps
                        .map((step) => step.step)
                        .join("\n");
                }
            }

            return {
                name: d.title,
                summary: d.summary,
                instructions,
                imageUrl: d.image,
                ingredients: [...new Set(d.extendedIngredients.map((ingr) => ingr.aisle))].join(
                    ", "
                ),
                userId: 1,
            };
        });

        let recipeId = 0;
        const nutrients = data.map((d) => {
            let nutrientsArr = d.nutrition.nutrients;
            recipeId++;
            return {
                calories: nutrientsArr.find((n) => n.name == "Calories").amount,
                fat: nutrientsArr.find((n) => n.name == "Fat").amount,
                carbs: nutrientsArr.find((n) => n.name == "Carbohydrates").amount,
                sugar: nutrientsArr.find((n) => n.name == "Sugar").amount,
                cholesterol: nutrientsArr.find((n) => n.name == "Cholesterol").amount,
                sodium: nutrientsArr.find((n) => n.name == "Sodium").amount,
                protein: nutrientsArr.find((n) => n.name == "Protein").amount,
                fiber: nutrientsArr.find((n) => n.name == "Fiber").amount,
                recipeId: recipeId,
            };
        });

        fs.writeFileSync("./data/recipes.json", JSON.stringify(recipes, null, 2));
        fs.writeFileSync("./data/nutrients.json", JSON.stringify(nutrients, null, 2));
    } catch (error) {
        console.log(error);
    }
}

fetchRecipes();
