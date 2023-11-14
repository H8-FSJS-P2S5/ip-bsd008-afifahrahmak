const { UserController } = require("../controllers/userController");
const express = require("express");
const { authentication } = require("../middleware/authentication");
const { AuthController } = require("../controllers/oauthGoogle");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/google-login", AuthController.googleLogin);
router.use(authentication);

module.exports = { router };
