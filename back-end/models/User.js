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
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    repeatPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
