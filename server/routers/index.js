const express = require("express");
const { authentication } = require("../middleware/authentication");
const { routerUser } = require("./userRouter");
const { routerPost } = require("./postRouter");
const router = express.Router();

router.use("/user", routerUser);
router.use(authentication);
router.use("/post", routerPost);
// router.get()

module.exports = { router };
