const { signToken } = require("../helper/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");
require("dotenv").config();
class AuthController {
  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;
      // const testAccount = await nodemailer.createTestAccount();
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.VITE_CLIENT_ID_GOOGLE,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "sukasuka",
          username: payload.name,
          imageProfile: payload.picture,
        },
        hooks: false,
      });

      const access_token = signToken({ id: user.id });
      // Send an email using Nodemailer
      const password = process.env.EMAIL_PASSWORD;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
          user: "kamikazesatria@gmail.com",
          pass: password,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: "Welcome to Your App",
        text: "Thank you for signing up!",
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          // Handle the error, for example, by sending an error response to the client
          return res.status(500).json({ error: "Failed to send email" });
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({ access_token });
        }
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = { AuthController };
