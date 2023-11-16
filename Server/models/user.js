"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Cart);
      this.hasMany(models.Transaction);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "email must not be empty" },
          notNull: { msg: "email must not be null" },
          isEmail: {
            args: true,
            msg: "email must be in email format",
          },
        },
      },
      fullName: DataTypes.STRING,
      mobileNumber: DataTypes.INTEGER,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "password must not be empty" },
          notNull: { msg: "password must not be null" },
          min: {
            args: 5,
            msg: "Minimum password length is 5",
          },
        },
      },
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    //user or instance refer to User
    user.password = hashPassword(user.password);
  });

  return User;
};
