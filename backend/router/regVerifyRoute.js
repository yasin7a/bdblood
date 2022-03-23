// external imports
const express = require("express");

// internal imports
const verifyToken = require("../controllers/regVerifyController");
const {
  doVerifyValidators,
  doVerifyValidationHandler,
} = require("../middleware/verify/verfiyValidator");
const router = express.Router();

router.post("/", doVerifyValidators, doVerifyValidationHandler, verifyToken);

module.exports = router;
