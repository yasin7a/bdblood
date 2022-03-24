const createError = require("http-errors");
const User = require("../models/Donar");
const ResetToken = require("../models//ResetToken");
const bcrypt = require("bcrypt");

async function forgotPassword(req, res) {
  const { userId, otp, password } = req.body;

  try {
    if (!password.trim()) {
      throw createError("Verify failed! Please try again.");
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw createError("User not valid! Please try again.");
    }

    let token = await ResetToken.findOne({ userId: user._id });
    if (!token) {
      throw createError("Token match failed! Please try again.");
    }
    let isMatch = await token.compareToken(otp);
    if (!isMatch) {
      throw createError("Token match failed! Please try again.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await ResetToken.findByIdAndDelete(token._id);
    await user.save();

    res.status(200).json({
      message: "password reset successfull!",
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
