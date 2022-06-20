const ErrorResponse = require("../utils/ErrorResponse");

exports.verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return next(new ErrorResponse("권한없음", 401));

    const rolesArray = [...allowedRoles];

    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result) return next(new ErrorResponse("유효한 권한 아님", 401));

    next();
  };
};
