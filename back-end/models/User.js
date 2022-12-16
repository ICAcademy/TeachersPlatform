const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    age: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', function (next) {
  const birthYear = this.dateOfBirth.slice(6, this.dateOfBirth.length);
  const currentYear = new Date().getFullYear();
  (this.age = currentYear - birthYear), next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
