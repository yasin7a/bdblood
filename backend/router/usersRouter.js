// external imports
const express = require("express");

// internal imports
const { addUser } = require("../controllers/usersController");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middleware/users/userValidatot");

const router = express.Router();

// add user
router.post("/", addUserValidators, addUserValidationHandler, addUser);

module.exports = router;
