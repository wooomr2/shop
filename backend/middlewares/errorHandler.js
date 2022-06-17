const ErrorResponse = require("../utils/ErrorResponse");
const { logEvents } = require("./logHandler");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.log(err);

  // 몽고DB id Error
  if (err.name === "CastError") {
    const message = `Resources not found with this id..Invalid ${err.path}`;
    err = new ErrorResponse(message, 400);
  }

  //11000 - duplicate error key
  if (err.code === 11000) {
    const message = `Duplicate Field Value Enter`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Your url is invalid please try again`;
    error = new ErrorResponse(message, 403);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Your url is expired please try again`;
    error = new ErrorResponse(message, 403);
  }

  res.status(error.statusCode || 500).json({
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
