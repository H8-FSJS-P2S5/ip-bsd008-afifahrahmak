const express = require("express");
const router = express.Router();
const konselorController = require("../controllers/konselorController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/", konselorController.readKonselor);
router.get("/check-availability", konselorController.readAvailableKonselor);
router.get("/:id", konselorController.readKonselorById);

module.exports = router;
