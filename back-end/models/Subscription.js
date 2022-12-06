const { Schema, model } = require('mongoose');

const subscriptionSchema = new Schema({
  teacherID: {
    type: String,
  },
  teacherFullName: {
    type: String,
  },
  teacherEmail: {
    type: String,
  },
  studentID: {
    type: String,
  },
  studentFullName: {
    type: String,
  },
  studentEmail: {
    type: String,
  },
});

module.exports = model('Subscription', subscriptionSchema);
