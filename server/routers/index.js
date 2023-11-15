const router = require("express").Router()
const petRouter = require("./petRouter")
const userRouter = require("./userRouter")

router.use("/user", userRouter)
router.use("/pets", petRouter)

module.exports = router