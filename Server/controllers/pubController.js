const { Product, Category, Cart, Transaction, User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const nodemailer = require("nodemailer");

class PubController {
  //PRODUCT
  static async readProductByCategoryId(req, res, next) {
    try {
      const { cId } = req.params;
      const product = await Product.findAll({
        include: [{ model: Category }],
        where: {
          CategoryId: cId,
        },
      });

      if (!product) {
        throw new Error("NotFound");
      }

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async readProductByProductId(req, res, next) {
    try {
      const { pId } = req.params;
      const product = await Product.findOne({
        include: [{ model: Category }],
        where: {
          id: pId,
        },
      });

      if (!product) {
        throw new Error("NotFound");
      }

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async readAllProduct(req, res, next) {
    try {
      const product = await Product.findAll({
        include: [{ model: Category }],
      });
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //CATEGORY
  static async readAllCategory(req, res, next) {
    try {
      const category = await Category.findAll({
        include: [{ model: Product }],
      });
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //PUBLIC
  static async login(req, res, next) {
    try {
      //1.ambil data dari req body
      const { email, password } = req.body;

      //2.validasi dihandle di model dan constraint di migration

      if (!email || !password) {
        throw new Error("Email/password tidak diberikan");
      }

      //3.cari data dari database
      const user = await User.findOne({
        where: { email: email },
      });

      if (!user) {
        throw new Error("Email diberikan invalid/tidak terdaftar");
      }

      //4.cek password
      if (!comparePassword(password, user.password)) {
        throw new Error("Password diberikan salah / tidak match");
      }

      //5.generate token
      const payload = {
        userId: user.id,
      };

      const token = signToken(payload);

      //6.kirim token sebagai response
      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      //1.dapetin input dari req.body
      const { email, fullName, mobileNumber, password } = req.body;
      const newUser = {
        email,
        fullName,
        mobileNumber,
        password,
        address,
      };

      //2.validasi dihandle di model dan constraint di migration

      //3.hash password dihandle di model

      //4.simpan ke database
      const response = await User.create(newUser);

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "gisellesamantha49@gmail.com",
          pass: "g l f l j x j i t t o o i h w h",
        },
      });

      let mailOptions = {
        from: "gisellesamantha49@gmail.com",
        to: email,
        subject: "Welcome to Enhance!",
        text: "Thank you for registering!",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      //5.kirim response ke client
      res
        .status(201)
        .json({ msg: `User id ${response.id} successfully created!` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PubController;
