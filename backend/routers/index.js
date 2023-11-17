const Controller = require("../controllers/controller");
const GoogleController = require("../controllers/googleController");
const userController = require("../controllers/userController");
const { authN } = require("../helpers");

const router = require("express").Router();
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/google-login", GoogleController.googleLogin);

router.use(authN);
router.post("/chat", Controller.chat);

router.get("/advice", Controller.advice);
router.get("/myAdvice", Controller.myAdvice);
router.post("/advice", Controller.addAdvice);

router.get("/advice/:id", Controller.detailAdvice);
router.put("/advice/:id", Controller.updateAdvice);
router.delete("/advice/:id", Controller.deleteAdvice);

router.get("/quote", Controller.quotes);
router.get("/quote/:id", Controller.quotesById);

router.get("/type", Controller.type);

module.exports = router;
