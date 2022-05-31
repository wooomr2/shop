const ErrorResponse = require("../utils/ErrorResponse");
const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

function sendToken(res, statusCode, user) {
  const token = user.generateSignedToken();
  const { password, ...others } = user._doc;
  res.status(statusCode).json({
    success: true,
    token,
    user: others,
  });
}

exports.signup = (req, res, next) => {
  const { username, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err) next(err);
    if (user) return next(new ErrorResponse("이미 가입한 유저", 400));

    User.create({
      username,
      email,
      password,
    })
      .catch((err) => next(new ErrorResponse(err, 400)))
      .then((user) => sendToken(res, 201, user));
  });
};

exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorResponse("Email & Password 입력하세요", 400));

  User.findOne({ email })
    .select("+password")
    .exec(async (err, user) => {
      if (err) next(err);
      if (!user) return next(new ErrorResponse("존재하지 않는 유저", 400));

      const isMatch = await user.matchPassword(password);
      if (!isMatch) return next(new ErrorResponse("잘못된 비밀번호", 401));

      sendToken(res, 200, user);
    });
};

exports.signout = (req, res) => {
  res.status(200).json({
    message: "Signout successfully...!",
  });
};

exports.forgotPassword = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err) next(err);
    if (!user) return next(new ErrorResponse("Email 전송 실패"), 404);

    const resetToken = user.generateResetPasswordToken();

    user.save();

    const resetUrl = `http://localhost:3000/reset_password/${resetToken}`;
    const message = `<h1>비밀번호 초기화 요청</h1>
    <p>Please make a put request to the following link:</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;

    try {
      sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });
      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      user.save();

      return next(new ErrorResponse(err, 500));
    }
  });
};

exports.resetPassword = (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).exec((err, user) => {
    if (err) next(err);
    if (!user) return next(new ErrorResponse("유효하지 않은 토큰", 400));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    user.save();

    res.status(201).json({
      success: true,
      data: "비밀번호 변경 선공",
      token: user.generateSignedToken(),
    });
  });
};