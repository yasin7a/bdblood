const { check, validationResult } = require("express-validator");

const doLoginValidators = [
  check("username")
    .isLength({
      min: 1,
    })
    .withMessage("Number or Name is required"),
  check("password").isLength({ min: 1 }).withMessage("Password is required"),
];

const doLoginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
};

module.exports = {
  doLoginValidators,
  doLoginValidationHandler,
};
