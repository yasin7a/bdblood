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

// process login

router.get("/", checkLogin, loggedIn);

router.post("/", doLoginValidators, doLoginValidationHandler, login);

// logout
router.delete("/", checkLogin,logout);

module.exports = router;
