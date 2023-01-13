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
    language: {
      type: String,
    },
    biography: {
      type: String,
    },
    phone: {
      type: String,
    },
    url: {
      type: String,
    },
    age: {
      type: Number,
    },
    preferences: {
      type: String,
    },
    socialMedias: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = model('Teacher', teacherSchema);
