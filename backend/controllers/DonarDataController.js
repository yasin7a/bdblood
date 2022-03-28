const User = require("../models/Donar");
const createError = require("http-errors");

async function DonarData(req, res) {
  try {
    let filter = {};

    if (req.query.bloodgp) {
      filter = { bloodgp: req.query.bloodgp };
    }

    const page = parseInt(req.query.page);
    const limit = 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < (await User.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    const allDonar = await User.find(filter)
      .select("-_id -password -createdAt -updatedAt -__v")
      .limit(limit)
      .skip(startIndex)
      .exec();

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
