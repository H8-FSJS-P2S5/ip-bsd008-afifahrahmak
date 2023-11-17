const express = require("express");
const routerPost = express.Router();
const { Controller } = require("../controllers/controller");
const { authorization } = require("../middleware/authorization");
const { middlewareUpload } = require("../middleware/multer");
// console.log(middlewareUpload);
routerPost.post("/", middlewareUpload, Controller.addPost);
routerPost.get("/", Controller.readPosts);
// routerPost.get("/:postId", Controller.readPostById);
routerPost.put(
  "/:postId",
  middlewareUpload,
  authorization,
  Controller.updatePost
);
routerPost.delete("/:postId", authorization, Controller.deletePostById);
routerPost.get("/:postId/comment", Controller.getCommentByPostId);
routerPost.post("/:postId/comment", Controller.addCommentByPostId);
routerPost.post("/:postId/like", Controller.addLikes);

module.exports = { routerPost };
