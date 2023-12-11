const JWTHelper = require("../helpers/jwt");
const ErrorHandler = require("./errorHandler");
const { User, Recipe, Nutrient } = require("../models/index");

class Auth {
    static async authenticate(req, res, next) {
        try {
            // get access token from req.headers
            const bearerToken = req.headers.authorization;
            if (!bearerToken) throw new Error(ErrorHandler.Authentication);
            const accessToken = bearerToken.split(" ")[1];

            // decode and verify access token
            const decoded = JWTHelper.decode(accessToken);
            const user = await User.findOne({ where: { id: decoded.id } });
            if (!user) throw new Error(ErrorHandler.Authentication);

            // save user data
            req.loginInfo = {
                userId: decoded.id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                age: user.age,
                height: user.height,
                weight: user.weight,
            };

            next();
        } catch (error) {
            next(error);
        }
    }

    static async authorise(req, res, next) {
        try {
            const userId = req.loginInfo.userId;
            const recipeId = req.params.id;
            let recipe = await Recipe.findOne({ where: { id: recipeId } });
            if (!recipe) throw new Error(ErrorHandler.DataNotFound);
            if (userId != recipe.userId) throw new Error(ErrorHandler.Authorization);
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Auth;
