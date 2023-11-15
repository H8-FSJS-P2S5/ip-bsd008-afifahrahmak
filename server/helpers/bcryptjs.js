const bcrypt = require("bcryptjs");

const hash = (val) => bcrypt.hashSync(val, bcrypt.genSaltSync())

const verivyHash = (raw, hashed) => bcrypt.compareSync(raw, hashed)

module.exports = { hash, verivyHash }