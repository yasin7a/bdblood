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
    phone: {
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
  },
  {
    timestamps: true,
  }
);

const Donar = mongoose.model("Donar", donarSchema);

module.exports = Donar;
