const { Schema, model } = require('mongoose');

const subscriptionSchema = new Schema({
  teacherID: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  studentID: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'reject'],
  },
});

module.exports = model('Subscription', subscriptionSchema);
