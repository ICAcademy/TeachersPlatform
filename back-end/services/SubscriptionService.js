const SubscriptionModel = require('../models/Subscription');
const { socket } = require('../listeners/Socket');

exports.getAllSubscriptions = async () => {
  return await SubscriptionModel.find();
};

exports.getTeacherSubscriptions = async (id) => {
  return await SubscriptionModel.find({ teacherID: id }).populate('studentID');
};

exports.getStudentSubscriptions = async (id) => {
  return await SubscriptionModel.find({ studentID: id }).populate('teacherID');
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
  const updatedSubscription = await SubscriptionModel.findByIdAndUpdate(id, subscription, {
    new: true,
    runValidators: true,
  });

  socket('subscription:updated', updatedSubscription.studentID);

  return updatedSubscription;
};

exports.deleteSubscription = async (id) => {
  return await SubscriptionModel.findByIdAndDelete(id);
};

exports.getSubscriptionsByStatus = async (statusName, id) => {
  return await SubscriptionModel.countDocuments({
    status: { $regex: statusName, $options: 'i' },
    $or: [{ teacherID: id }, { studentID: id }],
  });
};
