//                               DB Course Module:

const mongoose = require("mongoose");
const coursesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const courseModule = mongoose.model("Course", coursesSchema);

module.exports = courseModule;
