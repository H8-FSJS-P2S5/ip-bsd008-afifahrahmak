const { Op } = require("sequelize");
const { Product, Category, Cart, Transaction, User } = require("../models");

class UserController {
  static async readUserByUserId(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      console.log(userId, "<<<<<<8");

      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error("NotFound");
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async editUserByUserId(req, res, next) {
    try {
      const { email, fullName, mobileNumber, password, address } = req.body;

      const { userId } = req.loginInfo;

      let readUser = await User.findOne({
        where: { id: userId },
      });

      if (!readUser) {
        throw new Error("NotFound");
      }

      await User.update(
        {
          email,
          fullName,
          mobileNumber,
          password,
          address,
        },
        { where: { id: userId } }
      );

      let user = await User.findOne({
        where: { id: userId },
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
