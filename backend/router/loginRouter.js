// external imports
const express = require("express");

// internal imports
const { login, logout, loggedIn } = require("../controllers/loginController");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middleware/login/loginValidators");
const { checkLogin } = require("../middleware/common/checkLogin");

const router = express.Router();
const User = require("../models/Donar");

// process login

router.get("/", checkLogin, loggedIn);

router.post("/", doLoginValidators, doLoginValidationHandler, login);

// logout
router.delete("/", logout);

module.exports = router;
