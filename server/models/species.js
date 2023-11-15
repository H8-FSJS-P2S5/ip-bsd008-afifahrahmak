'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Species extends Model {
    static associate(models) {
      Species.hasMany(models.Pet, { foreignKey: "SpeciesId" })
    }
  }
  Species.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Species name must be filled`
        },
        notNull: {
          msg: `Species name must be filled`
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Species',
  });
  return Species;
};