const { Schema, model } = require('mongoose');

const subscriptionSchema = new Schema({
  teacherID: {
    type: Schema.Types.ObjectId,
  },
  teacherFullName: {
    type: String,
  },
  teacherEmail: {
    type: String,
  },
  studentID: {
    type: Schema.Types.ObjectId,
  },
  studentFullName: {
    type: String,
  },
  studentEmail: {
    type: String,
  },
});

module.exports = model('Subscription', subscriptionSchema);
