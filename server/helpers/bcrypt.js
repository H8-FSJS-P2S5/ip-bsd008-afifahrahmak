const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 8;

class BcryptHelper {
    static hashPassword(password) {
        return bcrypt.hashSync(password, SALT_ROUNDS);
    }

    static compareHash(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}

module.exports = BcryptHelper;
