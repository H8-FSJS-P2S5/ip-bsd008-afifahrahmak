const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topicController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/", topicController.readTopic);
router.get("/:id", topicController.readTopicById);

module.exports = router;
