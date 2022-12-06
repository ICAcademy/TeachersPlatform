const SubscriptionModel = require('../models/Subscription');

exports.createSubscription = async (subscription) => {
  return await SubscriptionModel.create({
    teacherID: subscription.teacher._id,
    teacherFullName: subscription.teacher.fullName,
    teacherEmail: subscription.teacher.email,
    studentID: subscription.student._id,
    studentFullName: subscription.student.fullName,
    studentEmail: subscription.student.email,
  });
};
