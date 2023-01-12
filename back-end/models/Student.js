const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
    },
    number: {
      type: String,
    },
    url: {
      type: String,
    },
    level: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Student', studentSchema);
