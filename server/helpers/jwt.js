const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_KEY;

const createToken = (data) => {
  return jwt.sign(data, JWT_SECRET);
};

const signToken = (data) => {
  return jwt.sign(data, JWT_SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  createToken,
  signToken,
  verifyToken,
};
