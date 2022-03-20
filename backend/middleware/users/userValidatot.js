// external imports
const { check, body, validationResult } = require("express-validator");
const createError = require("http-errors");
const emailCheck = require("email-check");

// internal imports
const User = require("../../models/Donar");

// add user
const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("No symbol or number is requiered")
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
    })
    .custom((value) => {
      if (!value.includes("gmail")) {
        throw createError("Must be a gmail");
      }
      return true;
    })
    .custom(async (value) => {
      try {
        let iSvalid = await emailCheck(value);
        if (!iSvalid) {
          throw createError("Email dosen't exists!");
        }
      } catch (err) {
        throw createError("Email dosen't exists!");
      }

      return true;
    }),

  check("phone")
    .isMobilePhone("bn-BD")
    .withMessage("Mobile number must be BD number")
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
  check("gender").notEmpty().withMessage("Gender is Requiered"),
  check("bloodgp").notEmpty().withMessage("Blood Group is Requiered"),

  check("location").notEmpty().withMessage("Location is Requiered").trim(),
  check("latitude")
    .isLength({ min: 3 })
    .withMessage("Latitude is Requiered")
    .trim(),
  check("longitude")
    .isLength({ min: 3 })
    .withMessage("Longitude is Requiered")
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
