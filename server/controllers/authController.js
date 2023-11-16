const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");
const { signToken } = require("../helpers/jwt");

class AuthController {
  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers
      const client = new OAuth2Client()

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload()
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
      })
      const access_token = signToken({ id: user.id })
      res.status(200).json(access_token)
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = AuthController

