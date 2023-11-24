const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    if (!req.headers.authorization) throw { message: "gaada token" };
    // 1. ambil access_token dari headers
    let access_token = req.headers.authorization.split(" ")[1];
    // 2. verify token dan dapatkan payload
    let { id } = verifyToken(access_token);
    // 3. cari usernya ada atau engga
    let user = await User.findByPk(id);
    // 4. throw error kalau user tidak ada
    if (!user) throw { name: "Unauthentication" };
    // 5. simpan data user kedalam object request
    req.user = {
      id: user.id,
      userId: user.id,
      email: user.email,
      username: user.username,
    };
    // 6. next
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
