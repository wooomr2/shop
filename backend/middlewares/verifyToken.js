const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

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