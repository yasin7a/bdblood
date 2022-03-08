// external imports
const express = require("express");

// internal imports
const { login, logout } = require("../controllers/loginController");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middleware/login/loginValidators");
const {
  checkLogin,
  redirectLoggedIn,
} = require("../middleware/common/checkLogin");

const router = express.Router();


// process login
router.post(
  "/",
  // checkLogin,
  // redirectLoggedIn,
  doLoginValidators,
  doLoginValidationHandler,
  login
);

// logout
router.delete("/", logout);

module.exports = router;
