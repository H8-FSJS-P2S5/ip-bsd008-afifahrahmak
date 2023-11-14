const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "INTERNAL_SERVER_ERROR";
  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors.map((el) => {
      return el.message;
    });
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 401;
    message = "Email is already in use";
  }
  if (err.name === "Password wrong") {
    statusCode = 401;
    message =
      "Sorry, your password was incorrect. Please double-check your password.";
  }
  if (err.name === "Unauthorized") {
    statusCode = 401;
    message = "Please Login First";
  }
  if (err.name === "Not Found") {
    statusCode = 404;
    message = "Not Found";
  }
  res.status(statusCode).json({ message });
};

module.exports = {
  errorHandler,
};
