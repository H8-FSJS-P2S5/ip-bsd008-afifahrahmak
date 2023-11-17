const { Op } = require("sequelize");
const {
  Product,
  Category,
  Cart,
  Transaction,
  User,
  ProductCart,
} = require("../models");
const midtransClient = require("midtrans-client");

class TransactionController {
  static async addTransactionByUserId(req, res, next) {
    try {
      const { isPaid, address } = req.body;
      const { userId } = req.loginInfo;

      let putInTransaction = {
        isPaid,
        UserId: userId,
      };
      await Transaction.create(putInTransaction);
      await User.update({ address: address }, { where: { id: userId } });
      res.status(201).json({
        msg: `Order for user with id ${userId} successfully placed!`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async generateMidtransToken(req, res, next) {
    try {
      //for gross amount
      const { realTotal } = req.body;
      const { userId } = req.loginInfo;
      const user = await User.findOne({
        where: {
          id: userId,
        },
        include: [{ model: Transaction }],
      });
      if (user.Transactions.isPaid === "true") {
        throw { name: "already_paid" };
      }

      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: `TRANSACTION_${new Date().getTime()}_${userId}`, //harus unique
          gross_amount: +realTotal, //total pembayarannya
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;
