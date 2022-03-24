const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Donar",
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), expires: 3600 },
});

tokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const hash = await bcrypt.hash(this.token, 8);
    this.token = hash;
  }
  next();
});
tokenSchema.methods.compareToken = async function (token) {
  const result = await bcrypt.compare(token, this.token);
  return result;
};

const ResetToken = mongoose.model("ResetToken", tokenSchema);

module.exports = ResetToken;
