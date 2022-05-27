const ErrorResponse = require("../../utils/ErrorResponse");
const User = require("../../models/User");

function sendToken(res, statusCode, user) {
  const token = user.generateSignedToken();
  const { password, ...others } = user._doc;
  res.status(statusCode).json({
    success: true,
    token,
    user: others,
  });
}

//////////////////////////////////////////////
exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorResponse("Email & Password 입력하세요", 400));

  User.findOne({ email })
    .select("+password +role")
    .exec(async (err, user) => {
      if (err) next(err);
      if (!user) return next(new ErrorResponse("존재하지 않는 유저", 400));

      const isMatch = await user.matchPassword(password);
      if (!isMatch) return next(new ErrorResponse("잘못된 비밀번호", 401));
      if (user.role === "admin" || user.role === "root") {
        sendToken(res, 200, user);
      } else {
        return next(new ErrorResponse("관리자가 아닙니다", 401));
      }
    });
};
