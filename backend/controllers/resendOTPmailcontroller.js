const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const User = require("../models/Donar");
const EmailToken = require("../models/VerificationToken");
const { genOTP, sendMail } = require("../utils/sendMail");

async function resendOTPmail(req, res) {
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
    if (user.verified) {
      throw createError("Already Verified! Please try again.");
    }

    let token = await EmailToken.findOne({ userId: user._id });
    await EmailToken.findByIdAndDelete(token._id);

    let OTP = genOTP();
    let verifyToken = new EmailToken({
      userId: user._id,
      token: OTP,
    });
    await verifyToken.save();
    await sendMail(user.email, "Verify email", OTP);
 

 
    res.status(200).json({
      message: "Resend OTP successfull!",
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

module.exports = resendOTPmail;
