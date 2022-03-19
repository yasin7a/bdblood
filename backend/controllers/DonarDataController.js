const User = require("../models/Donar");
const createError = require("http-errors");

async function DonarData(req, res) {
  try {
    const allDonar = await User.find({}).select(
      "-_id -password -createdAt -updatedAt -__v"
    );

    if (allDonar) {
      res.status(200).json({
        message: "all Donar",
        allDonar,
      });
    } else {
      throw createError("Sorry!! No Donar Found.");
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

module.exports = DonarData;
