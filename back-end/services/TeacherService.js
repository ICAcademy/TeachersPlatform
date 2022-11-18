const TeacherModel = require('../models/Teacher');

exports.getAllTeachers = async () => {
  return await TeacherModel.find();
};

