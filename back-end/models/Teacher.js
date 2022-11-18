const { Schema, model } = require('mongoose');

const teacherSchema = new Schema({
  name: {
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
});

module.exports = model('Teacher', teacherSchema);

