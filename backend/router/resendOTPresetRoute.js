// external imports
const express = require("express");

const router = express.Router();
const resendOTPreset = require("../controllers/resendOTPresetController");
// add user
router.post("/", resendOTPreset);

module.exports = router;
