const StudentslModel = require('../models/Students');

exports.getAllStudents = async () => {
  return await StudentslModel.find();
};

exports.createStudents = async (students) => {
  return await StudentslModel.create(students);
};

exports.getStudentsById = async (id) => {
  return await StudentslModel.findById(id);
};

exports.updateStudents = async (id, students) => {
  return await StudentslModel.findByIdAndUpdate(id, students);
};

exports.deleteStudents = async (id) => {
  return await StudentslModel.findByIdAndDelete(id);
};
