// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../models/Donar");

// do login
async function login(req, res, next) {
  try {
    // find a user who has this email/number
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { number: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
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
        res.status(200).json({
          message: "Login successfully!",
          authToken,
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
};
