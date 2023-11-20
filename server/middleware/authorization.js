const { Post } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { userId } = req.loginInfo;
    const { postId } = req.params;

    // Find the post by postId
    const post = await Post.findOne({ where: { id: postId } });

    // Check if the post exists
    if (!post) {
      throw { name: "Not Found" };
    }
    // f the user is the owner of the post
    if (post.userId !== userId) {
      throw { name: "Forbidden" };
    }

    // If everything is fine, proceed to the next middleware
    next();
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    next(error);
  }
};

module.exports = { authorization };
