const { OAuth2Client } = require("google-auth-library");
const { signToken } = require("../helpers");
const { User } = require("../models");
class GoogleController {
  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;

      const client = new OAuth2Client();
      const audienceNum = process.env.audience;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: audienceNum,
      });
      console.log(ticket, "=======================");

      const payload = ticket.getPayload();
      console.log(payload);

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "password_google",
        },
        hooks: false,
      });
      console.log(user);
      const access_token = signToken({
        id: user.id,
        email: user.email,
      });
      console.log(access_token, "============================== acc token");
      res.status(200).json({
        access_token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = GoogleController;
