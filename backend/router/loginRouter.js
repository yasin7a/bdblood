// external imports
const express = require("express");

// internal imports
const { login, logout } = require("../controllers/loginController");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middleware/login/loginValidators");
const { checkLogin } = require("../middleware/common/checkLogin");

const router = express.Router();
const User = require("../models/Donar");

// process login

router.get("/", checkLogin, async (req, res) => {
  try {
    const obj = await User.findById(req.user);
    let donor = {
      name: obj.name,
      email: obj.email,
      phone: obj.phone,
      gender: obj.gender,
      bloodgp: obj.bloodgp,
      location: obj.location,
      latitude: obj.latitude,
      longitude: obj.longitude
    };
    return res.status(200).json({ donor });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.post("/", doLoginValidators, doLoginValidationHandler, login);

// logout
router.delete("/", logout);

module.exports = router;
