require("dotenv");
const { signToken } = require("../helper/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
class AuthController {
  static async googleLogin(req, res, next) {
    try {
      const token = req.headers;
      const client = OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID_GOOGLE,
      });
      const payload = ticket.getPayload();
      console.log(payload);
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "sukasuka",
        },
        hooks: false,
      });
      const access_token = signToken(payload);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = { AuthController };
