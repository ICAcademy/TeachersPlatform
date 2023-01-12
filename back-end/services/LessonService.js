const Lesson = require('../models/Lesson');

const getLessonsById = async (id) =>
  await Lesson.find({ $or: [{ teacherId: id }, { studentId: id }] });

const startLesson = async (body) => await Lesson.create(body);

const endLesson = async (id, body) =>
  await Lesson.findByIdAndUpdate(id, body, { new: true, runValidators: true });

module.exports = { getLessonsById, startLesson, endLesson };
