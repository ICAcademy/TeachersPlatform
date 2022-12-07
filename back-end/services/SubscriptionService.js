const SubscriptionModel = require('../models/Subscription');
const TeacherModel = require('../models/Teacher');
const StudentModel = require('../models/Student');

exports.getAllSubscriptions = async () => {
  return await SubscriptionModel.find();
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

exports.findByID = async (teacherID, studentID) => {
  const existTeacherID = await TeacherModel.findOne({ _id: teacherID });
  const existStudentID = await StudentModel.findOne({ _id: studentID });
  if (existTeacherID && existStudentID) {
    return true;
  } else {
    return false;
  }
};
