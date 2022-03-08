// external imports
const express = require("express");

// internal imports
const { addUser } = require("../controllers/usersController");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middleware/users/userValidatot");
const {
  checkLogin,
  redirectLoggedIn,
} = require("../middleware/common/checkLogin");

const router = express.Router();

// add user
router.post(
  "/",
  // checkLogin,
  // redirectLoggedIn,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

module.exports = router;
