const mongoose = require("mongoose");
const uuid = require("uuid");
let jwt = require("jsonwebtoken");

console.log(uuid.v4());

let schema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid.v4() },
    name: {
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
    gender: String,
    status: String,
  },
  { id: false }
);

schema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
  return token;
};

const Userdb = mongoose.model("userdb", schema);

module.exports = Userdb;
