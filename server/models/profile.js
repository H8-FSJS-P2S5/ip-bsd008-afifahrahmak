"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Profile.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name cannot be null",
          },
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
      photoProfile: DataTypes.STRING,
      address: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [5, 255],
            msg: "Address must be between 5 and 255 characters",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: {
            msg: "Phone number should contain only numbers",
          },
          len: {
            args: [10, 15],
            msg: "Phone number must be between 10 and 15 digits",
          },
        },
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
