const { default: axios } = require("axios");
const { Advice, Type, Quote } = require("../models");
class Controller {
  static async advice(req, res, next) {
    try {
      const data = await Advice.findAll();

      // console.log(data);

      res.status(200).json({
        message: "success read advice",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async type(req, res, next) {
    try {
      const data = await Type.findAll();

      // console.log(data);

      res.status(200).json({
        message: "success read TYpe",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addAdvice(req, res, next) {
    try {
      console.log(req.body);
      //   console.log(req.loginInfo);
      const { userId } = req.loginInfo;

      const { title, advice, TypeId } = req.body;

      await Advice.create({
        title,
        advice,
        TypeId,
        UserId: userId,
      });

      res.status(201).json({
        message: "success add advice",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async detailAdvice(req, res, next) {
    try {
      //   console.log(req.body);
      //   console.log(req.loginInfo);
      const { id } = req.params;

      const data = await Advice.findOne({
        where: {
          id,
        },
        include: {
          model: Type,
        },
      });
      console.log(data);

      if (!data) throw { name: "NotFound" };

      res.status(200).json({
        message: "success read advice",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateAdvice(req, res, next) {
    try {
      //   console.log(req.body);
      //   console.log(req.loginInfo);
      const { id } = req.params;
      const { title, advice, TypeId } = req.body;

      let data = await Advice.findOne({
        where: {
          id,
        },
      });

      if (!data) throw { name: "NotFound" };

      await Advice.update(
        {
          title,
          advice,
          TypeId,
        },
        {
          where: {
            id,
          },
        }
      );

      console.log(data);

      data = await Advice.findOne({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "success update advice",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async myAdvice(req, res, next) {
    try {
      // console.log(req.loginInfo);
      const { userId } = req.loginInfo;

      const data = await Advice.findAll({
        where: {
          UserId: userId,
        },
      });

      // console.log(data, "================");
      res.status(200).json({
        message: "success read advice",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteAdvice(req, res, next) {
    try {
      //   console.log(req.body);
      //   console.log(req.loginInfo);
      const { id } = req.params;
      const { userId } = req.loginInfo;

      const advice1 = await Advice.findOne({
        where: {
          id,
          UserId: userId,
        },
      });

      if (!advice1) throw { name: "you cant delete this advice" };

      let data = advice1;

      await Advice.destroy({
        where: {
          id,
          UserId: userId,
        },
      });

      res.status(200).json({
        message: "success delete advice",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async chat(req, res, next) {
    try {
      const { username } = req.body;
      const private_key = process.env.private_key;
      const r = await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: username, first_name: username },
        { headers: { "private-key": private_key } }
      );

      res.status(r.status).json(r.data);
    } catch (error) {
      res.status(e.response.status).json(e.response.data);
      next(error);
    }
  }

  static async quotes(req, res, next) {
    try {
      const data = await Quote.findAll();

      // const data = await r.json();
      // console.log(r);
      res.status(200).json({
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async quotesById(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Quote.findByPk(id);

      res.status(200).json({
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
