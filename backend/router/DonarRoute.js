// external imports
const express = require("express");

const router = express.Router();

const {
  DonarData,
  DonarDataMap,
} = require("../controllers/donarDataController");

// Donar Data
router.get("/", DonarData);
router.get("/map", DonarDataMap);

module.exports = router;
