const express = require("express");
const routerUser = express.Router();
const { UserController } = require("../controllers/userController");
const { AuthController } = require("../controllers/oauthGoogle");
const { middlewareUploadImageProfile } = require("../middleware/multer");

routerUser.post(
  "/register",
  middlewareUploadImageProfile,
  UserController.register
);
routerUser.post("/login", UserController.login);
routerUser.post("/google-login", AuthController.googleLogin);

module.exports = { routerUser };
