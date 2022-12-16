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
    age: {
      type: String,
    },
    email: {
      type: String,
    },
    number: {
      type: String,
    },
  },
  { timestamps: true },
);

studentSchema.pre('save', function (next) {
  const birthYear = this.dateOfBirth.slice(6, this.dateOfBirth.length);
  const currentYear = new Date().getFullYear();
  (this.age = currentYear - birthYear), next();
});

module.exports = mongoose.model('Student', studentSchema);
