'use strict';
const { Model } = require('sequelize');
const { hash, verivyHash } = require("../helpers/bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: "UserId" })
      User.hasMany(models.Pet, { foreignKey: "UserId" })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Username must be filled`
        },
        notNull: {
          msg: `Username must be filled`
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: `Input correct email format`
        },
        notEmpty: {
          msg: `Username must be filled`
        },
        notNull: {
          msg: `Username must be filled`
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Password must be filled`,
        },
        notNull: {
          msg: `Password must be filled`,
        },
        len: [5, 30],
      },
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        if (!user.role) user.role = "User"
        user.password = hash(user.password)
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};