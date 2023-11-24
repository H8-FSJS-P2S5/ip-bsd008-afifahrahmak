"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reservation.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      Reservation.belongsTo(models.Topic, {
        foreignKey: "topicId",
        as: "topic",
      });

      Reservation.belongsTo(models.Psychologist, {
        foreignKey: "psychologistId",
        as: "psychologist",
      });

      Reservation.hasOne(models.Payment, {
        foreignKey: "reservationId",
        as: "payment",
      });
      Reservation.hasMany(models.Schedule, {
        foreignKey: "reservationId", // Nama kunci asing
        as: "schedules", // Nama asosiasi
      });
    }
  }
  Reservation.init(
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Date and time cannot be null",
          },
          isDate: {
            msg: "Please provide a valid date and time",
          },
        },
      },
      time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Duration cannot be null",
          },
          min: {
            args: [1],
            msg: "Duration must be at least 1",
          },
        },
      },
      session_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Session count cannot be null",
          },
          min: {
            args: [1],
            msg: "Session count must be at least 1",
          },
        },
      },
      meetingType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Session count cannot be null",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description cannot be null",
          },
          notEmpty: {
            msg: "Description cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Reservation",
    }
  );
  return Reservation;
};
