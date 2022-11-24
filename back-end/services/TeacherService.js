const TeacherModel = require('../models/Teacher');

exports.getAllTeachers = async () => {
  return await TeacherModel.find();
};

exports.createTeacher = async (teacher) => {
  return await TeacherModel.create(teacher);
};

exports.getTeacherById = async (id) => {
  return await TeacherModel.findById(id);
};

exports.updateTeacher = async (id, teacher) => {
  return await TeacherModel.findByIdAndUpdate(id, teacher);
};

exports.deleteTeacher = async (id) => {
  return await TeacherModel.findByIdAndDelete(id);
};

