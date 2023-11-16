'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: "UserId" })
    }
  }
  Profile.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Please fill your name`
        },
        notNull: {
          msg: `Please fill your name`
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Please fill your address`
        },
        notNull: {
          msg: `Please fill your address`
        },
      },
    },
    phoneNumber: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `UserId must be filled`
        },
        notNull: {
          msg: `UserId must be filled`
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};