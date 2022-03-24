// external imports
const express = require("express");

// internal imports
const resetPassword = require("../controllers/resetPassController");
const {
  doResetVerifyValidators,
  doResetVerifyValidationHandler,
} = require("../middleware/resetPass/resetpassvalidator");
const router = express.Router();

router.post(
  "/",

  doResetVerifyValidators,
  doResetVerifyValidationHandler,
  resetPassword
);

module.exports = router;
