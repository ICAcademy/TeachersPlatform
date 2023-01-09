const StudentModel = require('../models/Student');

exports.getAllStudents = async () => {
  return await StudentModel.find();
};

exports.createStudent = async (student) => {
  return await StudentModel.create(student);
};

exports.getStudentById = async (id) => {
  return await StudentModel.findById(id);
};

exports.updateStudent = async (id, data) => {
  return await StudentModel.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteStudent = async (id) => {
  return await StudentModel.findByIdAndDelete(id);
};
