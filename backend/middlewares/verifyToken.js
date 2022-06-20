const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("./asyncHandler");

exports.verifyToken = asyncHandler(async (req, res, next) => {
  let token;
  let headerAuth = req.headers.authorization;

  if (headerAuth && headerAuth.startsWith("Bearer"))
    token = headerAuth.split(" ")[1];

  if (!token) return next(new ErrorResponse("토큰 없음", 401));

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return next(new ErrorResponse("유효하지 않은 토큰", 403));
    req.userId = decoded.id;
    req.roles = decoded.roles;
    next();
  });
});
