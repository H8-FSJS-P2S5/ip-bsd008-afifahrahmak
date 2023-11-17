"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Advice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Advice.belongsTo(models.User);
      Advice.belongsTo(models.Type);
    }
  }
  Advice.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "title is required",
          },
          notNull: {
            msg: "title is required",
          },
        },
      },
      advice: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "advice is required",
          },
          notNull: {
            msg: "advice is required",
          },
        },
      },
      TypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "TypeId is required",
          },
          notNull: {
            msg: "TypeId is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "UserId is required",
          },
          notNull: {
            msg: "UserId is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Advice",
    }
  );
  return Advice;
};
