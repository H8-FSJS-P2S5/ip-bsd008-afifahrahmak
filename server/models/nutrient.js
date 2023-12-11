"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Nutrient extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Recipe, { foreignKey: "recipeId" });
        }
    }
    Nutrient.init(
        {
            calories: DataTypes.FLOAT,
            carbs: DataTypes.FLOAT,
            protein: DataTypes.FLOAT,
            fat: DataTypes.FLOAT,
            sugar: DataTypes.FLOAT,
            fiber: DataTypes.FLOAT,
            sodium: DataTypes.FLOAT,
            cholesterol: DataTypes.FLOAT,
            recipeId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Nutrient",
        }
    );
    return Nutrient;
};
