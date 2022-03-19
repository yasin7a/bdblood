// external imports
const express = require("express");

const router = express.Router();

const DonarData = require("../controllers/DonarDataController");

// Donar Data
router.get("/", DonarData);

module.exports = router;
