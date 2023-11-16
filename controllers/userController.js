const { Op } = require("sequelize");
const { Product, Category, Cart, Transaction, User } = require("../models");

class UserController {
  static async readUserByUserId(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const user = await User.findOne({
        where: {
          userId,
        },
      });

      if (!user) {
        throw new Error("NotFound");
      }

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async editUserByUserId(req, res, next) {
    try {
      const { email, fullName, mobileNumber, password } = req.body;

      const { userId } = req.loginInfo;

      let readUser = await User.findByPk(userId);

      if (!readUser) {
        throw new Error("NotFound");
      }

      await User.update(
        {
          email,
          fullName,
          mobileNumber,
          password,
        },
        { where: { userId } }
      );

      let user = await User.findByPk(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
