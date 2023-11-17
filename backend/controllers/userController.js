const { signToken, compare } = require("../helpers");
const { User } = require("../models");
class userController {
  static async register(req, res, next) {
    try {
      // console.log(req.body);
      const { username, email, password } = req.body;

      const data = { username, email, password };

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        throw { name: "EmailUsed" };
      }

      await User.create(data);

      res.status(201).json({
        message: "successfully create user",
      });
    } catch (error) {
      // console.log(error, "=========================");
      next(error);
    }
  }

  static async login(req, res, next) {
    console.log(req.body, "=================");

    const { email, password } = req.body;

    const data = { email, password };

    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    console.log(user);

    if (!user) {
      throw { name: "NotFound" };
    }
    if (!compare(password, user.password)) {
      throw { name: "loginError" };
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const access_token = signToken(payload);

    res.status(200).json({
      access_token,
      email: user.email,
    });

    try {
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = userController;
