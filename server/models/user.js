"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Recipe, { foreignKey: "userId" });
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            age: {
                type: DataTypes.INTEGER,
                validate: {
                    min: {
                        args: [0],
                        msg: "age must be between 0 and 80 years old",
                    },
                    max: {
                        args: [80],
                        msg: "age must be between 0 and 80 years old",
                    },
                },
            },
            gender: DataTypes.STRING,
            height: {
                type: DataTypes.INTEGER,
                validate: {
                    min: {
                        args: [130],
                        msg: "Height must be between 130 cm and 230 cm",
                    },
                    max: {
                        args: [230],
                        msg: "Height must be between 130 cm and 230 cm",
                    },
                },
            },
            weight: {
                type: DataTypes.INTEGER,
                validate: {
                    min: {
                        args: 40,
                        msg: "weight must be between 40 kg and 160 kg",
                    },
                    max: {
                        args: 160,
                        msg: "weight must be between 40 kg and 160 kg",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
