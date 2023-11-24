const express = require("express");
const router = express.Router();
// const publicRoutes = require("./publicRoutes");
const userRoutes = require("./userRoutes");
const konselorRoutes = require("./konselorRoutes");
const topicRoutes = require("./topicRoutes");
const reservationRoutes = require("./reservationRoutes");
const paymentRoutes = require("./paymentRoutes");

// router.use("/pub", publicRoutes);
router.use(userRoutes);
router.use("/topic", topicRoutes);
router.use("/konselor", konselorRoutes);
router.use("/reservation", reservationRoutes);
router.use("/payment", paymentRoutes);

module.exports = router;
