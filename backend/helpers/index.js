const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret_key = process.env.secret_key;

const hashPw = (password) => {
  return bcrypt.hashSync(password);
};

const compare = (password, hashPw) => {
  return bcrypt.compareSync(password, hashPw);
};

const signToken = (payload) => {
  return jwt.sign(payload, secret_key);
};

const decode = (token) => {
  return jwt.verify(token, secret_key);
};

// console.log(decode, "==========ini decode");

const authN = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    console.log(authorization);

    if (!authorization) throw { name: "Unauthorized" };

    const access_token = authorization.split(" ")[1];

    const verified = decode(access_token);

    if (!verified) throw { name: "you're not verified" };

    const { id, email } = verified;

    req.loginInfo = {
      userId: id,
      email,
    };

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  hashPw,
  compare,
  signToken,
  decode,
  authN,
};
