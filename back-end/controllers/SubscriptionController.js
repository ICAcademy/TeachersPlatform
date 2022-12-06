const TeacherModel = require('../models/Teacher');
const StudentModel = require('../models/Student');
const subscriptionService = require('../services/SubscriptionService');

exports.createSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.createSubscription(req.body);
    const teacherAndStudent = await findByID(req.body.teacher._id, req.body.student._id);
    if (!teacherAndStudent) {
      throw new Error('Teacher or Student was not found!');
    }
    res.json(subscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const findByID = async (teacherID, studentID) => {
  const existTeacherID = await TeacherModel.findOne({ teacherID });
  const existStudentID = await StudentModel.findOne({ studentID });
  if (existTeacherID && existStudentID) {
    return true;
  }
  return false;
};
