var mongoose = require("mongoose");
const validator = require("validator");
var Schema = mongoose.Schema;

const studentSchema = new Schema({
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
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  address: {
    type: String,
    required: true,
  },
  gpa: {
    type: Number,
  },

  grade: {
    type: Number,

  },
  parentsPhone: {
    type: String,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Phone number is invalid");
      }
    },
  },
  section: {
    type: String,
  },

  dateOfBirth: {
    type: String,
    required: true,
  },
  periods: {
    type: [mongoose.Types.ObjectId],
    ref: "Period",
    default: [],
    maxLength: 8
  },
  avatar: {
    type: String,

    default: ""
  },
  enrolled: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;