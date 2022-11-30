const { Schema, model } = require('mongoose');

const teacherSchema = new Schema(
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
    phone: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = model('Teacher', teacherSchema);
