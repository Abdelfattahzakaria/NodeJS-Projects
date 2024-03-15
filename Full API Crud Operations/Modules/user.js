//                                         users model:

const mongoose = require("mongoose");
const validator = require("validator");
const roles = require("../Utils/roles");

const userSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Email Is Required"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [roles.USER, roles.ADMAIN, roles.MANGER],
    default: roles.USER,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
