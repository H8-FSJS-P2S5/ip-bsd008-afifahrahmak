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
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;
