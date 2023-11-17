"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: "userId" });
      User.hasMany(models.Comment, { foreignKey: "userId" });
      User.hasMany(models.Like, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Username is required",
          },
          notEmpty: {
            msg: "Username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "password cannot be empty",
          },
          notNull: {
            msg: "password cannot be empty",
          },
          len: {
            args: 5,
            msg: "Password length must be 5 characters",
          },
        },
      },
      imageProfile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "imageProfile is required",
          },
          notEmpty: {
            msg: "imageProfile is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((data) => {
    data.password = hashPassword(data.password);
  });
  return User;
};
