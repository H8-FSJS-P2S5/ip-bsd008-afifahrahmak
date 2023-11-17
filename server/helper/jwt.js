require("dotenv");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
// console.log(SECRET_KEY, "inii");
// const SECRET_KEY = "ini_aman";
const signToken = (payload) => {
  //buat encode payload yng mau kita simpan pas login jaddci access token
  return jwt.sign(payload, SECRET_KEY);
};

const decode = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  signToken,
  decode,
};
