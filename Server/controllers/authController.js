const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class AuthController {
  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      console.log(ticket, "<<<< ini ticket");

      const payload = ticket.getPayload();
      console.log(payload, "<<<< ini payload");
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "password_google",
        },
        hooks: false,
      });
      console.log(user, "<<< ini user");
      const access_token = signToken({ userId: user.id });
      res.status(200).json(access_token);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
