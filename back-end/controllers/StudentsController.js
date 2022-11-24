const studentsService = require('../services/StudentsService');
console.log();

exports.getAllStudents = async (req, res) => {

  try {
    const students = await studentsService.getAllStudents();
    res.json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createStudents = async (req, res) => {
  try {
    const students = await studentsService.createStudents(req.body);
    res.json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStudentsById = async (req, res) => {
  try {
    const students = await studentsService.getStudentsById(req.params.id);
    res.json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateStudents = async (req, res) => {
  try {
    const students = await studentsService.updateStudents(req.params.id, req.body);
    res.json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStudents = async (req, res) => {
  try {
    const students = await studentsService.deleteStudents(req.params.id);
    res.json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
