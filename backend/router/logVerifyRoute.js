// external imports
const express = require("express");

// internal imports
const verifyToken = require("../controllers/logVerifyController");
const {
    doVerifyValidators,
    doVerifyValidationHandler,
  } = require("../middleware/verify/verfiyValidator");
const router = express.Router();

router.post("/", doVerifyValidators, doVerifyValidationHandler, verifyToken);

module.exports = router;
