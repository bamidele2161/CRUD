const mongoose = require("mongoose");
let jwt = require("jsonwebtoken");

let schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  phone: String,
  address: String,
  gender: String,
});

schema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: 86400,
  });
  return token;
};

const Userdb = mongoose.model("userdb", schema);

module.exports = Userdb;
