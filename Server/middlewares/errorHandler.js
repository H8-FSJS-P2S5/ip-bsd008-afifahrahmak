const errorHandler = (err, req, res, next) => {
  console.log(err);
  let status = 500;
  let message = "Internal Server Error";

  if (err.name === "SequelizeForeignKeyConstraintError") {
    status = 400;
    message = "Foreign key error";
  }

  if (err.message === "Email/password tidak diberikan") {
    status = 401;
    message = "Email/Password tidak diberikan";
  }

  if (err.message === "The product is already existing in cart.") {
    status = 403;
    message = "The product is already existing in cart.";
  }

  if (err.name === "already_paid") {
    status = 400;
    message = "You have already paid";
  }

  if (err.message === "Password diberikan salah / tidak match") {
    status = 401;
    message = "Password diberikan salah / tidak match";
  }

  if (err.message === "Email diberikan invalid/tidak terdaftar") {
    status = 401;
    message = "Email diberikan invalid/tidak terdaftar";
  }

  if (err.name === "SequelizeValidationError") {
    status = 400;
    message = "validation error";
  }

  if (err.name === "SequelizeDatabaseError") {
    status = 400;
    message = "Database error";
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = "Unique constraint error";
  }

  if (err.message === "Unauthorized") {
    status = 401;
    message = "Tolong login terlebih dahulu";
  }

  if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid token";
  }

  if (err.message === "Forbidden") {
    status = 403;
    message = "You have no access";
  }

  if (err.message === "NotFound") {
    status = 404;
    message = "Data not found";
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
