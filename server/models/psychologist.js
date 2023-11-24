"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Psychologist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Psychologist.hasMany(models.Reservation, {
        foreignKey: "psychologistId",
        as: "reservations",
      });

      Psychologist.hasMany(models.Schedule, {
        foreignKey: "psychologistId",
        as: "schedules",
      });
    }
  }
  Psychologist.init(
    {
      name: DataTypes.STRING,
      specialization: DataTypes.STRING,
      hourly_rate: DataTypes.INTEGER,
      availability: DataTypes.STRING,
      email: DataTypes.STRING,
      photoImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Psychologist",
    }
  );
  return Psychologist;
};
