// external imports
const express = require("express");

// internal imports
const  forgotPassword  = require("../controllers/forgotPasswordController");
const {
  doForgotPassValidators,
  doForgotPassValidationHandler,
} = require("../middleware/forgotpass/forgotpassvalidator");
const router = express.Router();

router.post(
  "/",
  doForgotPassValidators,
  doForgotPassValidationHandler,
  forgotPassword
);

module.exports = router;
