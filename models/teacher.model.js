var mongoose = require("mongoose");
const validator = require("validator");
var Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
    length: 15,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  avatar: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
  },

  phone: {
    type: String,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Phone number is invalid");
      }
    },
    unique: true,
  },
  subject: {
    type: String,
    enum: ["Physics", "English", "Math", "Chemistry", "Biology", "Arabic", "Religion", "Geography", "History", "PE"],
  },
  is_admin: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Teacher", teacherSchema);