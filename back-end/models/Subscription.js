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
});

module.exports = model('Subscription', subscriptionSchema);
