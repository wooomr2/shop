const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/User");

exports.verifyToken = async (req, res, next) => {
  let token;
  let headerAuth = req.headers.authorization;

  if (headerAuth && headerAuth.startsWith("Bearer"))
    token = headerAuth.split(" ")[1];

  if (!token) return next(new ErrorResponse("유효하지 않은 토큰", 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return next(new ErrorResponse("id와 일치하는 user 없음", 401));

    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorResponse(err, 401));
  }
};

exports.userAuth = (req, res, next) => {
    if (req.user.role !== "user") {
      if (req.user.role !== "admin") {
        if (req.user.role !== "root") {
          return next(new ErrorResponse("USER access denied", 401));
        }
      }
    }
    next();
};

exports.adminAuth = (req, res, next) => {
    if (req.user.role !== "admin") {
      if (req.user.role !== "root") {
        return next(new ErrorResponse("ADMIN access denied", 401));
      }
    }
    next();
};

exports.rootAuth = (req, res, next) => {
    if (req.user.role !== "root") {
      return next(new ErrorResponse("ROOT access denied", 401));
    }
    next();
};
