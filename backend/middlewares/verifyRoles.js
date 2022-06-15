const ErrorResponse = require("../utils/ErrorResponse");

exports.userRole = (req, res, next) => {
  if (req.user.role !== "user") {
    if (req.user.role !== "admin") {
      if (req.user.role !== "root") {
        return next(new ErrorResponse("USER access denied", 401));
      }
    }
  }
  next();
};

exports.adminRole = (req, res, next) => {
  if (req.user.role !== "admin") {
    if (req.user.role !== "root") {
      return next(new ErrorResponse("ADMIN access denied", 401));
    }
  }
  next();
};

exports.rootRole = (req, res, next) => {
  if (req.user.role !== "root") {
    return next(new ErrorResponse("ROOT access denied", 401));
  }
  next();
};