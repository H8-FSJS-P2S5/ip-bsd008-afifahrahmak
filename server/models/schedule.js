"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schedule.belongsTo(models.Psychologist, {
        foreignKey: "psychologistId",
        as: "psychologist",
      });
      Schedule.belongsTo(models.Reservation, {
        foreignKey: "reservationId", // Nama kunci asing
        as: "reservation", // Nama asosiasi
      });
    }
  }
  Schedule.init(
    {
      date: DataTypes.DATE,
      time: DataTypes.TIME,
      status: DataTypes.STRING,
      reservationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
