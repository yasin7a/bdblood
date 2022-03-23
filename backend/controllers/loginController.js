// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../models/Donar");
const EmailToken = require("../models/VerificationToken");
const { genOTP, sendMail } = require("../utils/sendMail");
// do logged in user

async function loggedIn(req, res) {
  try {
    const donor = await User.findById(req.user, {
      name: 1,
      email: 1,
      phone: 1,
      gender: 1,
      bloodgp: 1,
      location: 1,
    });
    return res.status(200).json({ donor });
  } catch (error) {
    return res.status(500).send("Server error");
  }
}

// do login
async function login(req, res, next) {
  try {
    // find a user who has this email/number
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { phone: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        const payload = { userId: user._id };

        if (!user.verified) {
          //token verify
          let token = await EmailToken.findOne({ userId: user._id });
          if (!token) {
            let OTP = genOTP();
            let verifyToken = new EmailToken({
              userId: user._id,
              token: OTP,
            });
            await verifyToken.save();
            await sendMail(user.email, "Verify email", OTP);
            res.status(200).json({
              message: "OTP sent successfully!",
              payload,
            });
          } else {
            res.status(200).json({
              message: "OTP is still valid! check your email",
              payload,
            });
          }
        }

        if (res.headersSent) return;
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
        res.status(200).json({
          message: "Login successfully!",
          authToken,
          isVerified: user.verified,
          payload,
        });
      } else {
        throw createError("Login failed! Please try again.");
      }
    } else {
      throw createError("Login failed! Please try again.");
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

// do logout
async function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.json({ msg: "logged out" });
}

module.exports = {
  login,
  logout,
  loggedIn,
};
