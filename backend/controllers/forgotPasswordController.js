const createError = require("http-errors");
const User = require("../models/Donar");
const { genOTP, sendMail } = require("../utils/sendMail");
const ResetToken = require("../models//ResetToken");

async function forgotPassword(req, res) {
  const { email } = req.body;
  try {

  if (!email.trim()) {
    throw createError("Verify failed! Please try again.");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw createError("User not valid! Please try again.");
  }

  let token = await ResetToken.findOne({ userId: user._id });
  if (token) {
    throw createError("Try 1 hour later token is still valid.");
  }

  let OTP = genOTP();
  let verifyToken = new ResetToken({
    userId: user._id,
    token: OTP,
  });
  await verifyToken.save();
  await sendMail(user.email, "reset password email", OTP);

  res.status(200).json({
    message: "forgot password email successfull!",
    userId: user._id,
  });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

module.exports = forgotPassword;
