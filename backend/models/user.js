"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Advice);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "email is required",
          },
          notNull: {
            msg: "email is required",
          },
          isEmail: {
            msg: "wrong email format",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "username is required",
          },
          notNull: {
            msg: "username is required",
          },
        },
      },
      password: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "email is required",
          },
          notNull: {
            msg: "email is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((el) => {
    el.password = bcrypt.hashSync(el.password);
  });

  return User;
};
