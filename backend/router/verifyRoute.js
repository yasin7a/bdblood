// external imports
const express = require("express");

// internal imports
const verifyToken = require("../controllers/verifyController");

const router = express.Router();

router.post("/", verifyToken);

module.exports = router;
