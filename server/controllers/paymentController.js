const {
  Topic,
  User,
  Payment,
  Reservation,
  Psychologist,
} = require("../models");
const {
  sendEmailToUser,
  sendEmailToPsychologist,
} = require("../api/nodeMailer");
const midtransClient = require("midtrans-client");
// const { nanoid } = require("nanoid");

class PaymentController {
  static async createPayment(req, res, next) {
    try {
      const { userId, reservationId } = req.body;

      const reservation = await Reservation.findOne({
        where: { id: reservationId, userId: userId },

        include: [
          { model: Psychologist, as: "psychologist" },
          { model: Topic, as: "topic" },
        ],
      });

      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }

      const hourlyRate = reservation.psychologist.hourly_rate;
      const duration = reservation.duration;

      const totalPaymentAmount = hourlyRate * duration;

      const payment = await Payment.create({
        reservationId: reservationId,
        amount: totalPaymentAmount,
        payment_status: "pending",
        userId: userId,
      });

      const snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      const orderId = `trx-pr-012806${reservationId}-${userId}`;
      const parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: totalPaymentAmount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: req.user.username,
          email: req.user.email,
        },
      };

      const token = await snap.createTransaction(parameter);

      // await payment.update({ payment_status: "paid" });

      if (payment.payment_status === "pending") {
        const user = await User.findByPk(userId);
        const psychologist = reservation.psychologist;

        const reservationDetails = `Detail Reservasi:'
          Konselor: ${reservation.psychologist.name}
          Tanggal: ${reservation.date_time}
          Durasi: ${reservation.duration} jam
          Topik: ${reservation.topic.topic_name}
          Permasalahan: ${reservation.description}
        `;

        const userMessage = `Terima kasih ${user.username} telah Reservasi Layanan Hacktiv Health! Berikut adalah detail reservasi anda dan jumlah yang harus di bayarkan untuk melanjutkan reservasi anda:
        
        =================================  

        ${reservationDetails}

        =================================

        Jumlah yang harus di bayarkan : 
        
        Rp. ${totalPaymentAmount}

        Terima Kasih Banyak!

        =================================
        `;

        const psychologistMessage = `Pengguna dengan username ${user.username} telah melakukan reservasi untuk konseling. Berikut detailnya:
          ${reservationDetails}
        `;

        // Kirim email ke pengguna
        sendEmailToUser(user.email, "Pembayaran Berhasil", userMessage);

        // Kirim email ke psikolog
        sendEmailToPsychologist(
          psychologist.email,
          "Reservasi dari Pengguna",
          psychologistMessage
        );
      }

      return res
        .status(201)
        .json({ payment, orderId, transaction_token: token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentController;
