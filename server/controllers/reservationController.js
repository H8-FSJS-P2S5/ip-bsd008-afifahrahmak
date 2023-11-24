const {
  Reservation,
  Psychologist,
  User,
  Topic,
  Payment,
} = require("../models");
const {
  sendEmailReservation,
  sendEmailToPsychologist,
} = require("../api/nodeMailer");

class reservationController {
  static async createReservation(req, res, next) {
    try {
      const {
        date,
        time,
        duration,
        session_count,
        meetingType,
        description,
        topicId,
        psychologistId,
      } = req.body;

      const user = await User.findByPk(req.user.id);
      const topic = await Topic.findByPk(topicId);
      const psychologist = await Psychologist.findByPk(psychologistId);

      // Buat reservasi
      const newReservation = await Reservation.create({
        date,
        time,
        duration,
        session_count,
        meetingType,
        description,
        userId: req.user.id,
        topicId,
        psychologistId,
      });

      if (newReservation) {
        const successMessage = `Terima kasih ${user.username} telah Reservasi Layanan Hacktiv Health.
        ===============================
        Berikut detail reservasi :

        Topic : ${topic.topic_name},
        Konselor : ${psychologist.name}
        Date : ${date},
        Time : ${time},
        Duration: ${duration} jam,
        Meeting Type : ${meetingType},
        Keluhan : ${description}
        ==============================

        Terima kasih :)
        `;

        const successMessageKonselor = `Hai, ${psychologist.name} anda telah menerima Reservasi Layanan Hacktiv Health.
        ===============================
        Berikut detail reservasi :

        Topic : ${topic.topic_name},
        Pasien : ${user.username}
        Date : ${date},
        Time : ${time},
        Duration: ${duration} jam,
        Meeting Type : ${meetingType},
        Keluhan : ${description}
        ==============================

        Terima kasih :)
        `;

        sendEmailReservation(user.email, "Reservasi Berhasil", successMessage);
        sendEmailToPsychologist(
          psychologist.email,
          "Anda Menerima Reservasi Baru",
          successMessageKonselor
        );

        res.status(201).json({
          message: "Reservation created successfully",
          reservation: newReservation,
        });
      } else {
        throw { message: "RegisterError" };
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getUserReservation(req, res, next) {
    try {
      const userId = req.user.id;

      const reservations = await Reservation.findAll({
        where: { userId },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["username", "email"],
          },
        ],
      });

      res.status(200).json({ reservations });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = reservationController;
