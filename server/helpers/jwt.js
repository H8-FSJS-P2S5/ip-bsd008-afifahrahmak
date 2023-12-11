if (process.env.NODE_ENV !== "production") require("dotenv").config();
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../middlewares/errorHandler");
const SECRET_KEY = process.env.SECRET_KEY;

class JWTHelper {
    static encode(payload) {
        return jwt.sign(payload, SECRET_KEY);
    }

    static decode(token) {
        return jwt.verify(token, SECRET_KEY);
    }
}

module.exports = JWTHelper;
