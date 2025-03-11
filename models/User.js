const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true }, // Firebase UID
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
