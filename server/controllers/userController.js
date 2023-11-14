const { hashPassword, compareHash } = require("../helper/bcrypt");
const { User } = require("../models");
const { signToken } = require("../helper/jwt");
class UserController {
  static async register(req, res, next) {
    const { username, email, password } = req.body;
    try {
      const newUser = {
        username,
        email,
        password,
        dateOfBirth: "1990-01-01",
      };
      // console.log(newUser);
      const response = await User.create(newUser);
      if (!response) {
        throw { name: "Create User Failed" };
      }
      let data = {
        email: response.email,
      };
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    // console.log(req.body, "inii");
    const { email, password } = req.body;
    try {
      if (!email) {
        throw { name: "Email" };
      } else if (!password) {
        throw { name: "Password" };
      }
      let data = await User.findOne({
        where: { email },
      });
      if (!data) {
        throw { name: "Not Found" };
      }
      const validPassword = compareHash(password, data.password);
      if (!validPassword) {
        throw { name: "Password wrong" };
      }
      const payload = { id: data.id, email };
      const token = signToken(payload);
      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { UserController };
