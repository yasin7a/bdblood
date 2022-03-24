const { check, validationResult } = require("express-validator");
const User = require("../../models/Donar");
const createError = require("http-errors");

const doResetVerifyValidators = [
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
  check("password")
    .isLength({ min: 6 })
    .withMessage("At least 6 characters is required"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is Requiered")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw createError("Confirmation does not match");
      }
      return true;
    }),
];

const doResetVerifyValidationHandler = function (req, res, next) {
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
  doResetVerifyValidators,
  doResetVerifyValidationHandler,
};
