const SubscriptionModel = require('../models/Subscription');

exports.getAllSubscriptions = async () => {
  return await SubscriptionModel.find();
};

exports.getTeachersSubscriptions = async (id) => {
  return await SubscriptionModel.find({ teacherID: id });
};

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

exports.getSubscriptionById = async (id) => {
  return await SubscriptionModel.findById(id);
};

exports.updateSubscription = async (id, subscription) => {
  return await SubscriptionModel.findByIdAndUpdate(id, subscription);
};

exports.deleteSubscription = async (id) => {
  return await SubscriptionModel.findByIdAndDelete(id);
};
