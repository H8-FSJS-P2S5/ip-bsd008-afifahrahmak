const { Post, Like } = require("../models");

exports.toggleLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let like = await Like.findOne({ where: { postId, userId } });
    let liked = false;

    if (like) {
      await like.destroy();
      liked = false;
    } else {
      await Like.create({ postId, userId });
      liked = true;
    }

    const likesCount = await Like.count({ where: { postId } });

    res.json({ liked, likes: likesCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
