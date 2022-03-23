const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const User = require("../models/Donar");
const EmailToken = require("../models/VerificationToken");
const jwt = require("jsonwebtoken");

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

    if (user && user._id) {
      const payload = { userId: user._id };
      // generate token
      const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });

      // set cookie
      res.cookie(process.env.COOKIE_NAME, authToken, {
        maxAge: process.env.JWT_EXPIRY * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
      });

      user.verified = true;
      await EmailToken.findByIdAndDelete(token._id);
      await user.save();
      res.status(200).json({
        message: "Email confirmation successfully done!",
        authToken,
      });
    } else {
      throw createError("Email confirmation failed! Please try again.");
    }
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
