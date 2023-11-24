const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  console.log(err.name);
  console.log(err.message);

  if (err.name === "SequelizeValidationError") {
    code = 400;
    message = err.errors[0].message;
  }

  if (err.name === "SequelizeDatabaseError") {
    code = 400;
    message = "Invalid Data Type";
  }

  if (err.message === "LoginError") {
    code = 400;
    message = "Invalid Email/Password Password";
  }

  if (err.message === "RegisterError") {
    code = 400;
    message = "Failed To Create New User";
  }

  if (err.message === "AddDataError") {
    code = 400;
    message = "Failed To create New Data";
  }

  if (err.message === "UpdateDataError") {
    code = 400;
    message = "(Validation Error) Failed To Update Data";
  }

  if (err.message === "PasswordError") {
    code = 400;
    message = "Invalid Email/password";
  }

  if (err.message === "Unauthorized") {
    code = 401;
    message = "Please Login First";
  }

  if (err.message === "Unauthentication") {
    code = 401;
    message = "Maaf anda tidak di izinkan melakukan tindakan ini";
  }

  if (err.message === "Forbidden") {
    code = 403;
    message = "You have no access";
  }

  if (err.message === "NotFound") {
    code = 404;
    message = "Data not Found";
  }

  if (err.message === "Required") {
    code = 400;
    message = "File upload is required";
  }

  if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Maaf anda tidak di izinkan melakukan tindakan ini";
  }

  res.status(code).json({ code, message });
};

module.exports = errorHandler;
