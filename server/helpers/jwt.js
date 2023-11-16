const jwt = require("jsonwebtoken")

const key = process.env.JWT_SECRET_KEY || "creqnan"

const signToken = (payload) => jwt.sign(payload, key)
const verivyToken = (value) => jwt.sign(value, key)

module.exports = { signToken, verivyToken }