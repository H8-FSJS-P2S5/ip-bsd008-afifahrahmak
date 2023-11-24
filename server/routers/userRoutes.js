const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const middlewaresUpload = require("../middlewares/multer");

router.post("/google-auth", userController.googleAuth);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.use(authentication);
router.get("/user", userController.readUser);
router.get("/user/:id", userController.readUserById);
router.post("/profile", middlewaresUpload, userController.createProfile);
router.get("/profile", userController.readProfile);
router.get("/profile/name", userController.readUserbyName);
router.get("/profile/:id", userController.readProfileById);
router.put("/profile/:id", userController.updateProfile);

module.exports = router;
