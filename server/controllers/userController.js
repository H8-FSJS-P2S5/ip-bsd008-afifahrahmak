const { verivyHash } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models")

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email) throw new Error("Email is required")
      if (!password) throw new Error("Password is required")
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) throw new Error("LoginError")

      const isValid = verivyHash(password, user.password);
      if (!isValid) throw new Error("PasswordError");

      const token = signToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      console.error(err);
      next(err)
    }
  }
}

module.exports = UserController