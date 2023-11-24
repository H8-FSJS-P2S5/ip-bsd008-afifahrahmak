const { Topic } = require("../models");

class topicController {
  // Topic Controller
  static async readTopic(req, res, next) {
    try {
      const topic = await Topic.findAll({});

      res.status(200).json({
        message: "Berhasil baca data",
        topic,
      });
    } catch (error) {
      next(error);
    }
  }
  static async readTopicById(req, res, next) {
    try {
      const { id } = req.params;
      const topic = await Topic.findOne({
        where: {
          id,
        },
      });

      if (!topic) {
        throw { message: "NotFound", id };
      }

      res.status(200).json({
        message: "Berhasil baca data Topic",
        topic,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = topicController;
