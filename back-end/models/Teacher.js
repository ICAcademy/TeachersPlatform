const { Schema, model } = require('mongoose');

const teacherSchema = new Schema(
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
    phone: {
      type: String,
    },
  },
  { timestamps: true },
);

teacherSchema.pre('save', function (next) {
  const birthYear = this.dateOfBirth.slice(6, this.dateOfBirth.length);
  const currentYear = new Date().getFullYear();
  (this.age = currentYear - birthYear), next();
});

module.exports = model('Teacher', teacherSchema);
