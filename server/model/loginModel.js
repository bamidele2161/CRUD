const mongoose = require("mongoose");
const uuid = require("uuid");

let loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
});

const Logindb = mongoose.model("Logindb", loginSchema);

module.exports = loginSchema;
