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

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded.id).exec();

  if (!user) return next(new ErrorResponse("유효하지 않은 토큰", 403));

  req.user = user;
  next();
});
