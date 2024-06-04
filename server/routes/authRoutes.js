const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { updateProfile } = require("../controllers/profileController");
const AuthController = require("../controllers/authGoogleController");

// Register & Login
router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/profile/update/:userId", updateProfile);
//google login
router.post("/google-login", AuthController.googleLogin);
router.post("/github", authController.githubLogin);

module.exports = router;
