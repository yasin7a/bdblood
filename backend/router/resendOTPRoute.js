// external imports
const express = require("express");


const router = express.Router();
const resendOTPmail = require("../controllers/resendOTPmailcontroller")
// add user
router.post("/", resendOTPmail);

module.exports = router;
