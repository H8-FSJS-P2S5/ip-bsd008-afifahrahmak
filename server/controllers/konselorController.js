const { Psychologist, Schedule } = require("../models");

class konselorController {
  // Konselor Controller
  static async readKonselor(req, res, next) {
    try {
      // Membaca konselor yang tersedia
      const availableKonselors = await Psychologist.findAll({});

      res.status(200).json({
        message: "Berhasil membaca data konselor yang tersedia",
        konselors: availableKonselors,
      });
    } catch (error) {
      next(error);
    }
  }
  static async readAvailableKonselor(req, res, next) {
    try {
      const { date, time, psychologistId } = req.query; // Ambil tanggal, waktu, dan psychologistId dari query parameter

      // Membaca daftar jadwal konselor yang tersedia pada tanggal dan waktu tertentu
      const availableSchedules = await Schedule.findAll({
        where: {
          date: date, // Sesuaikan dengan tanggal dan waktu yang diberikan
          time: time,
          status: "Tersedia",
        },
      });

      // Ambil ID konselor yang tersedia pada tanggal dan waktu tersebut
      const availableKonselorIds = availableSchedules.map(
        (schedule) => schedule.psychologistId
      );

      // Membaca daftar konselor yang tersedia berdasarkan ID yang telah diambil
      const availableKonselors = await Psychologist.findAll({
        where: {
          id: availableKonselorIds,
        },
      });

      res.status(200).json({
        message: "Berhasil membaca data konselor yang tersedia",
        konselors: availableKonselors,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readKonselorById(req, res, next) {
    try {
      const { id } = req.params;
      const konselor = await Psychologist.findOne({
        where: {
          id: id,
        },
      });

      if (!konselor) {
        throw { message: "NotFound", id };
      }

      res.status(200).json({
        message: "Berhasil baca data konselor",
        konselor,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = konselorController;
