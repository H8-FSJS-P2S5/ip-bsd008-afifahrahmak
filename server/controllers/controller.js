const { imagekit } = require("../middleware/imageKit");
const { User, Post, Comment, Like, sequelize } = require("../models");
class Controller {
  //! READ POST

  //! ADD POST
  static async addPost(req, res, next) {
    const { title, caption } = req.body;
    const { buffer } = req.file;
    const { userId } = req.loginInfo;
    try {
      const base64 = buffer.toString("base64");
      let response = await imagekit.upload({
        file: base64,
        fileName: req.file.originalname,
      });
      // const { title, caption, imageUrl } = req.body;
      const post = await Post.create({
        title,
        caption,
        imageUrl: response.url,
        userId,
      });
      res.status(201).json({ post });
    } catch (error) {
      console.log(error);
    }
  }
  static async readPosts(req, res, next) {
    try {
      let data = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["username", "imageProfile"],
          },
          {
            model: Like, // Replace 'Like' with the actual name of your Like model
          },
          {
            model: Comment, // Replace 'Comment' with the actual name of your Comment mode
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  //! update post
  static async updatePost(req, res, next) {
    console.log(req.file);
    const { title, caption, imageUrl } = req.body;
    const postId = req.params.postId;
    const { buffer } = req.file;
    try {
      const base64 = buffer.toString("base64");
      let response = await imagekit.upload({
        file: base64,
        fileName: req.file.originalname,
      });
      // Find the post by postId
      let existingPost = await Post.findOne({
        where: { id: postId },
      });

      // Check if the post exists
      if (!existingPost) {
        throw { name: "Not Found" };
      }

      // Update the post
      let [updatedRows, updatedPosts] = await Post.update(
        { title, caption, imageUrl: response.url },
        { where: { id: postId }, returning: true }
      );

      // Check if the post was successfully updated
      if (updatedRows > 0) {
        // console.log("Updated Post:", updatedPosts[0]);
        res.status(200).json({
          message: "Post successfully updated.",
          data: updatedPosts[0],
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  //! delete post Id
  static async deletePostById(req, res, next) {
    // console.log(req.params);
    try {
      const { postId } = req.params;
      let post = await Post.findOne({
        where: { id: postId },
      });
      if (!post) throw { name: "Not Found" };
      await Like.destroy({ where: { postId: postId } });
      await Comment.destroy({ where: { postId: postId } });
      await Post.destroy({
        where: { id: postId },
      });
      res.status(200).json({ message: `Post ${post.id} Success to delete` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  //! Get Comment
  static async getCommentByPostId(req, res, next) {
    const { postId } = req.params;
    try {
      if (!postId) {
        throw { name: "Not Found" };
      }
      let data = await Comment.findAll({
        where: {
          postId,
        },
        include: {
          model: User,
          attributes: ["username"],
        },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
  //! add comment
  static async addCommentByPostId(req, res, next) {
    const { userId } = req.loginInfo;
    const { comment } = req.body;
    const { postId } = req.params;
    try {
      if (!postId) throw { name: "Not Found" };
      const data = await Comment.create({
        comment,
        postId,
        userId,
      });
      let response = await Comment.findByPk(data.id, {
        include: {
          model: User,
          attributes: ["username"],
        },
      });
      res.status(201).json({ response });
    } catch (error) {
      next(error);
    }
  }
  //! like post
  static async addLikes(req, res, next) {
    console.log("heheh");
    const { userId } = req.loginInfo;
    const { postId } = req.params;
    try {
      let data = await Like.create({
        postId,
        userId,
      });
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { Controller };
