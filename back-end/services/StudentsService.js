const StudentsModel = require('../models/Students');

exports.getAllStudents = async () => {
  return await StudentsModel.find();
};

exports.createStudents = async (student) => {
  return await StudentsModel.create({
    name: student.name,
    dateOfBirth: student.dateOfBirth,
    email: student.email,
    number: student.number,
  });
};

exports.getStudentsById = async (id) => {
  return await StudentsModel.findById(id);
};

exports.updateStudents = async (id, students) => {
  return await StudentsModel.findByIdAndUpdate(id, students);
};

exports.deleteStudents = async (id) => {
  return await StudentsModel.findByIdAndDelete(id);
};
