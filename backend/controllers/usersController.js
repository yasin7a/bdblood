// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal imports
const User = require("../models/Donar");

// add user
async function addUser(req, res) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  newUser = new User({
    ...req.body,
    password: hashedPassword,
  });

  // save user or send error
  try {
    const user = await newUser.save();

    if (user && user._id) {
      const payload = { userId: user._id };
      // generate token
      const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });

      // set cookie
      res.cookie(process.env.COOKIE_NAME, authToken + process.env.LOGGER, {
        maxAge: process.env.JWT_EXPIRY * 1000,
        httpOnly: true,
        signed: true,
      });
      res.status(200).json({
        message: "Register successfully done!",
        authToken,
      });
    } else {
      throw createError("Register failed! Please try again.");
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

module.exports = {
  addUser,
};
