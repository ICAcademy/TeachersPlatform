const teacherService = require('../services/TeacherService');

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherService.getAllTeachers();
    res.json(teachers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

