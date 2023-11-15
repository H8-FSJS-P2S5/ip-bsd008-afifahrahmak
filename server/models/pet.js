'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      Pet.belongsTo(models.User, { foreignKey: "UserId" })
      Pet.belongsTo(models.Species, { foreignKey: "SpeciesId" })
    }
  }
  Pet.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Name must be filled`
        },
        notNull: {
          msg: `Name must be filled`
        },
      },
    },
    about: DataTypes.TEXT,
    breed: DataTypes.STRING,
    color: DataTypes.STRING,
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Gender must be filled`
        },
        notNull: {
          msg: `Gender must be filled`
        },
      },
    },
    age: DataTypes.STRING,
    adoptionFee: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    imageUrl: DataTypes.STRING,
    SpeciesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};