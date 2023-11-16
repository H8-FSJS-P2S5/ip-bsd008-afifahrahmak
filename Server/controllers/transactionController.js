const { Op } = require("sequelize");
const {
  Product,
  Category,
  Cart,
  Transaction,
  User,
  ProductCart,
} = require("../models");

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
}

module.exports = TransactionController;
