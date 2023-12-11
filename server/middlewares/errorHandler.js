class ErrorHandler {
    // not my errors
    static #sequelizeValidation = "SequelizeValidationError";
    static #sequelizeDatabase = "SequelizeDatabaseError";
    static #sequelizeUnique = "SequelizeUniqueConstraintError";
    static #sequelizeForeignKey = "SequelizeForeignKeyConstraintError";
    static #JSONWebToken = "JsonWebTokenError";
    static #googleAuth = "Wrong number of segments in token";

    // my errors
    static InvalidNullOrEmpty = "InvalidNullOrEmptyError";
    static InvalidLogin = "InvalidLoginDataError";
    static Authentication = "AuthenticationError";
    static Authorization = "AuthorizationError";
    static DataNotFound = "DataNotFoundError";

    static handle(err, req, res, next) {
        console.log(err); // so I know in the console what the error's about
        let status = 500;
        let msg = "internal server error";

        // 400
        if (err.name === ErrorHandler.#sequelizeDatabase) {
            status = 400;
            msg = "invalid data type or input";
        }
        if (
            err.name === ErrorHandler.#sequelizeValidation ||
            err.name === ErrorHandler.#sequelizeUnique
        ) {
            status = 400;
            msg = err.errors.map((e) => e.message);
        }
        if (err.name === ErrorHandler.#sequelizeForeignKey) {
            status = 400;
            msg = err.message;
        }
        if (err.message === ErrorHandler.InvalidNullOrEmpty) {
            status = 400;
            msg = "input must not be empty";
        }

        // 401
        if (
            err.name === ErrorHandler.#JSONWebToken ||
            err.message.includes(ErrorHandler.#googleAuth)
        ) {
            status = 401;
            msg = "invalid token";
        }
        if (err.message === ErrorHandler.Authentication) {
            status = 401;
            msg = "you must login first";
        }
        if (err.message === ErrorHandler.InvalidLogin) {
            status = 401;
            msg = "invalid username or email or password";
        }

        // 403
        if (err.message === ErrorHandler.Authorization) {
            status = 403;
            msg = "you have no access";
        }

        // 404
        if (err.message === ErrorHandler.DataNotFound) {
            status = 404;
            msg = "data not found";
        }

        res.status(status).json({ message: msg });
    }
}

module.exports = ErrorHandler;
