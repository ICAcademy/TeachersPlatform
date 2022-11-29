const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentsSchema = new Schema(
  {
    name: { type: String },
    dateOfBirth: { type: String },
    email: { type: String },
    number: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Students', studentsSchema);
