// controllers/commentController.js
const { Comment, User, Post } = require("../models");

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email"],
        },
        {
          model: Post,
          attributes: ["id", "content", "timestamp"],
        },
      ],
    });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

const getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [User, Post],
    });
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { postId, content } = req.body;

    if (!postId || !content) {
      return res.status(400).json({ error: "Missing postId or content" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const commentData = {
      userId: req.user.id,
      postId,
      content,
    };

    const comment = await Comment.create(commentData);
    res.status(201).json(comment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCommentsByPost = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId },
      include: [User, Post],
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getComments,
  getCommentById,
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
};
