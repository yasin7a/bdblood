const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const User = require("../models/Donar");
const ResetToken = require("../models/ResetToken");
const { genOTP, sendMail } = require("../utils/sendMail");

async function resendOTPreset(req, res) {
  const { userId } = req.body;
  try {
    if (!(userId || otp.trim())) {
      throw createError("Verify failed! Please try again.");
    }
    if (!isValidObjectId(userId)) {
      throw createError("Verify failed! Please try again.");
    }
    const user = await User.findById(userId);

    if (!user) {
      throw createError("User not valid! Please try again.");
    }
 
    let token = await ResetToken.findOne({ userId: user._id });
    await ResetToken.findByIdAndDelete(token._id);

    let OTP = genOTP();
    let verifyToken = new ResetToken({
      userId: user._id,
      token: OTP,
    });
    await verifyToken.save();
    await sendMail(user.email, "re-send reset password email", OTP);

    res.status(200).json({
      message: "Resend reset password OTP successfull!",
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

module.exports = resendOTPreset;
