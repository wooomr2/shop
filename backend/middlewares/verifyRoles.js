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

// const verifyRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req?.roles) return next(new ErrorResponse("권한없음", 401));

//     const rolesArray = [...allowedRoles];

//     const verified = req.roles
//       .map((role) => rolesArray.includes(role))
//       .find((val) => val === true);

//     if (!verified) return next(new ErrorResponse("유효한 권한 아님", 401));

//     next();
//   };
// };

// module.exports = verifyRoles;
