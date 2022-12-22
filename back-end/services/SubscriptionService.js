const SubscriptionModel = require('../models/Subscription');

exports.getAllSubscriptions = async () => {
  return await SubscriptionModel.find();
};

exports.getStudentSubscriptions = async (id) => {
  return await SubscriptionModel.find({ studentID: id }).populate('teacherID');
};

exports.getTeacherSubscriptions = async (id) => {
  return await SubscriptionModel.find({ teacherID: id }).populate('studentID');
};

exports.createSubscription = async (subscription) => {
  return await SubscriptionModel.create({
    teacherID: subscription.teacher._id,
    studentID: subscription.student._id,
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
