const JWTHelper = require("../helpers/jwt");
const ErrorHandler = require("../middlewares/errorHandler");
const { User, Recipe, Nutrient } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const { getBMI, calcIdealRecipeFromBMI } = require("../helpers/dataAnalysis");

class Controller {
    static async googleLogin(req, res, next) {
        try {
            const { token } = req.headers;
            if (!token) throw new Error(ErrorHandler.Authentication);

            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: { email: payload.email, password: "password-google" },
                hooks: false,
            });

            const accessToken = JWTHelper.encode({ id: user.id });
            res.status(200).json(accessToken);
        } catch (error) {
            next(error);
        }
    }

    static async completeProfile(req, res, next) {
        try {
            const { userId } = req.loginInfo;
            const { name, gender, age, height, weight } = req.body;
            await User.update(
                { name, gender, age, height, weight },
                {
                    where: { id: userId },
                }
            );

            let updatedUser = await User.findOne({
                attributes: { exclude: ["password"] },
                where: { id: userId },
            });
            res.status(200).json(updatedUser);
        } catch (error) {
            console.log("fail complete profile aslkdjlksahlksahjd");
            next(error);
        }
    }

    static async getUserInfo(req, res, next) {
        try {
            const { userId } = req.loginInfo;
            let user = await User.findOne({
                attributes: { exclude: ["password"] },
                where: { id: userId },
            });
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async getRecipes(req, res, next) {
        try {
            const data = await Recipe.findAll({
                include: Nutrient,
            });

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getRecipesById(req, res, next) {
        try {
            const { id } = req.params;
            let data = await Recipe.findOne({
                include: Nutrient,
                where: { id },
            });

            if (!data) throw new Error(ErrorHandler.DataNotFound);
            data = {
                name: data.name,
                summary: data.summary,
                instructions: data.instructions,
                imageUrl: data.imageUrl,
                ingredients: data.ingredients,
                calories: data.Nutrient.calories,
                carbs: data.Nutrient.carbs,
                protein: data.Nutrient.protein,
                fat: data.Nutrient.fat,
                sugar: data.Nutrient.sugar,
                fiber: data.Nutrient.fiber,
                sodium: data.Nutrient.sodium,
                cholesterol: data.Nutrient.cholesterol,
            };
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    // data analysis for users and recipes (with help from fitness-calculator API)
    static async recommendRecipe(req, res, next) {
        try {
            const { userId } = req.loginInfo;

            // user's BMI data
            const user = await User.findOne({ where: { id: userId } });
            if (!(user.age && user.gender && user.height && user.weight)) {
                throw new Error(ErrorHandler.InvalidNullOrEmpty);
            }
            const userBMI = await getBMI(user);

            // user's personalised recommendation of recipes
            const nutrients = await Nutrient.findAll();
            const idealRecipe = calcIdealRecipeFromBMI(userBMI, nutrients);

            res.status(200).json({ user: userBMI, idealRecipe });
        } catch (error) {
            next(error);
        }
    }

    // search for a recipe from SPOONACULAR (API)
    static async searchRecipe(req, res, next) {
        try {
            // get search query from query params
            const searchQuery = req.query.search;

            // get API recipe data from search query
            let { data } = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&number=1&addRecipeNutrition=true&instructionsRequired=true&apiKey=${process.env.SPOONACULAR_KEY}`
            );
            if (data.results.length === 0) throw new Error(ErrorHandler.DataNotFound);

            // convert API recipe data to our recipe data
            data = data.results;
            const recipe = data.map((d) => {
                let instructions, ingredients, nutrientsArr;
                if (d.analyzedInstructions) {
                    if (d.analyzedInstructions.length != 0) {
                        instructions = d.analyzedInstructions[0].steps
                            .map((step) => step.step)
                            .join("\n");
                    }
                }
                if (d.extendedIngredients) {
                    ingredients = [
                        ...new Set(d.extendedIngredients.map((ingr) => ingr.aisle)),
                    ].join(", ");
                } else if (d.nutrition) {
                    if (d.nutrition.ingredients) {
                        ingredients = [
                            ...new Set(d.nutrition.ingredients.map((ingr) => ingr.name)),
                        ].join(", ");
                    }
                }
                if (d.nutrition) nutrientsArr = d.nutrition.nutrients;

                return {
                    name: d.title,
                    summary: d.summary,
                    instructions,
                    imageUrl: d.image,
                    ingredients,
                    calories: nutrientsArr.find((n) => n.name == "Calories").amount,
                    fat: nutrientsArr.find((n) => n.name == "Fat").amount,
                    carbs: nutrientsArr.find((n) => n.name == "Carbohydrates").amount,
                    sugar: nutrientsArr.find((n) => n.name == "Sugar").amount,
                    cholesterol: nutrientsArr.find((n) => n.name == "Cholesterol").amount,
                    sodium: nutrientsArr.find((n) => n.name == "Sodium").amount,
                    protein: nutrientsArr.find((n) => n.name == "Protein").amount,
                    fiber: nutrientsArr.find((n) => n.name == "Fiber").amount,
                };
            });

            res.status(200).json(recipe[0]);
        } catch (error) {
            next(error);
        }
    }

    static async addRecipe(req, res, next) {
        try {
            const { userId } = req.loginInfo;
            const {
                name,
                summary,
                instructions,
                imageUrl,
                ingredients,
                calories,
                carbs,
                protein,
                fat,
                sugar,
                fiber,
                sodium,
                cholesterol,
            } = req.body;

            // create new recipe
            const newRecipe = await Recipe.create({
                name,
                summary,
                instructions,
                imageUrl,
                ingredients,
                userId,
            });

            // create new nutrients for that recipe
            await Nutrient.create({
                calories,
                carbs,
                protein,
                fat,
                sugar,
                fiber,
                sodium,
                cholesterol,
                recipeId: newRecipe.id,
            });

            let returnVal = await Recipe.findOne({
                include: Nutrient,
                where: { id: newRecipe.id },
            });
            returnVal = {
                name: returnVal.name,
                summary: returnVal.summary,
                instructions: returnVal.instructions,
                imageUrl: returnVal.imageUrl,
                ingredients: returnVal.ingredients,
                calories: returnVal.Nutrient.calories,
                carbs: returnVal.Nutrient.carbs,
                protein: returnVal.Nutrient.protein,
                fat: returnVal.Nutrient.fat,
                sugar: returnVal.Nutrient.sugar,
                fiber: returnVal.Nutrient.fiber,
                sodium: returnVal.Nutrient.sodium,
                cholesterol: returnVal.Nutrient.cholesterol,
            };

            res.status(201).json(returnVal);
        } catch (error) {
            next(error);
        }
    }

    static async deleteRecipe(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Recipe.findOne({
                include: Nutrient,
                where: { id },
            });

            if (!data) throw new Error(ErrorHandler.DataNotFound);

            // delete nutrient first, then recipe
            await Nutrient.destroy({ where: { recipeId: id } });
            await Recipe.destroy({ where: { id } });

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;
