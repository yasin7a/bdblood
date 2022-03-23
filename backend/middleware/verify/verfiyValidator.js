const { check, validationResult } = require("express-validator");
const User = require("../../models/Donar");
const createError = require("http-errors");

const doVerifyValidators = [
  check("otp")
    .isLength({
      min: 4,
    })
    .withMessage("OTP is required"),

  check("userId")
    .isLength({ min: 20 })
    .withMessage("invalid user info")
    .custom(async (value) => {
      try {
        const user = await User.findById(value);
        if (!user) {
          throw createError("invalid user info");
        }
      } catch (err) {
        throw createError("invalid user info");
      }
    }),
];

const doVerifyValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  doVerifyValidators,
  doVerifyValidationHandler,
};
