const mongoose = require("mongoose");

const donarSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    bloodgp: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Donar", donarSchema);

module.exports = User;
