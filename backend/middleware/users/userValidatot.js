// external imports
const { check, body, validationResult } = require("express-validator");
const createError = require("http-errors");

// internal imports
const User = require("../../models/Donar");

// add user
const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("phone")
    .isMobilePhone("bn-BD")
    .withMessage("Mobile number must be a valid Bangladeshi phone number")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ phone: value });
        if (user) {
          throw createError("Number already in use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw createError("Confirmation does not match password");
    }
    return true;
  }),
  check("gender").notEmpty().withMessage("Gender is Requiered"),
  check("bloodgp").notEmpty().withMessage("Blood Group is Requiered"),

  check("location")
    .isLength({ min: 5 })
    .withMessage("Location must contain more than 5 alphabet")
    .notEmpty()
    .withMessage("Location is Requiered")
    .trim(),
  check("latitude")
    .isLength({ min: 3 })
    .withMessage("Latitude must contain more than 3 alphabet")
    .trim(),
  check("longitude")
    .isLength({ min: 3 })
    .withMessage("Longitude must contain more than 3 alphabet")
    .trim(),
  check("user_captcha").custom((value) => {
    const captcha = ["trueCaptcha"];
    if (!captcha.includes(value)) {
      throw createError("Enter valid captcha");
    }
    return true;
  }),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidators,
  addUserValidationHandler,
};
