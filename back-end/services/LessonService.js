const Lesson = require('../models/Lesson');

const getLessonsById = async (id) =>
  await Lesson.find({ $or: [{ teacherId: id }, { studentId: id }], lessonStatus: 'processing' })
    .populate({
      path: 'studentId teacherId',
      select: 'fullName',
    })
    .sort('-createdAt');

const getSingleLessonById = async (id) =>
  await Lesson.findById(id).populate({
    path: 'studentId teacherId',
    select: 'fullName url',
  });

const startLesson = async (body) => await Lesson.create(body);

const updateLesson = async (id, body) =>
  await Lesson.findByIdAndUpdate(id, body, { new: true, runValidators: true }).populate({
    path: 'studentId teacherId',
    select: 'fullName url',
  });

const updateLessonAnswerById = async (roomId, questionId, answer) =>
  await Lesson.findByIdAndUpdate(
    roomId,
    { $set: { 'questions.$[el].selected': answer } },
    { arrayFilters: [{ 'el._id': questionId }], new: true, runValidators: true },
  ).populate({
    path: 'studentId teacherId',
    select: 'fullName url',
  });

const endLesson = async (id) => await Lesson.findByIdAndDelete(id);

const updateOnDisconnect = async (id, socketId) => {
  return Lesson.findByIdAndUpdate(
    id,
    [
      {
        $set: {
          teacherStatus: {
            $cond: {
              if: {
                $eq: ['$teacherSocketId', socketId],
              },
              then: 'offline',
              else: '$teacherStatus',
            },
          },
          studentStatus: {
            $cond: {
              if: {
                $eq: ['$studentSocketId', socketId],
              },
              then: 'offline',
              else: '$studentStatus',
            },
          },
        },
      },
    ],
    { new: true },
  ).populate({
    path: 'studentId teacherId',
    select: 'fullName url',
  });
};

module.exports = {
  getLessonsById,
  getSingleLessonById,
  startLesson,
  updateLesson,
  updateLessonAnswerById,
  endLesson,
  updateOnDisconnect,
};
