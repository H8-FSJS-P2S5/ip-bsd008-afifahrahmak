const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.post("/", paymentController.createPayment);

module.exports = router;
