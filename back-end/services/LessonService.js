const Lesson = require('../models/Lesson');

const getLessonsById = async (id) =>
  await Lesson.find({ $or: [{ teacherId: id }, { studentId: id }] })
    .populate({
      path: 'studentId',
      select: 'fullName',
    })
    .sort('-createdAt');

const getSingleLessonById = async (id) => await Lesson.findById(id);

const startLesson = async (body) => await Lesson.create(body);

const updateLesson = async (id, body) =>
  await Lesson.findByIdAndUpdate(id, body, { new: true, runValidators: true });

module.exports = { getLessonsById, getSingleLessonById, startLesson, updateLesson };
