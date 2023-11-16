const router = require("express").Router()
const userRouter = require("./userRouter")


router.use("/user", userRouter)

module.exports = router