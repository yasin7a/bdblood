const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const User = require("../models/Donar");
const EmailToken = require("../models/VerificationToken");

async function verifyToken(req, res) {
  const { userId, otp } = req.body;
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
    if (!token) {
      throw createError("Token invalid! Please try again.");
    }

    let isMatch = await token.compareToken(otp);
    if (!isMatch) {
      throw createError("Token match failed! Please try again.");
    }

    user.verified = true;
    await EmailToken.findByIdAndDelete(token._id);
    await user.save();
    res.status(200).json({
      message: "Token matched successfully!",
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

module.exports = verifyToken;
