const { decode } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw { name: "Unauthorized" };
    }
    const access_token = authorization.split(" ")[1];
    const verified = decode(access_token);
    const user = await User.findOne({
      where: {
        id: verified.id,
      },
    });
    if (!user) {
      throw { name: "Not found" };
    }
    const { id, email } = verified;
    req.loginInfo = {
      userId: id,
      email: email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
