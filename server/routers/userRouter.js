const AuthController = require("../controllers/authController")
const UserController = require("../controllers/userController")

const userRouter = require("express").Router()

userRouter.post("/login", UserController.login)
userRouter.post("/google-login", AuthController.googleLogin)

module.exports = userRouter