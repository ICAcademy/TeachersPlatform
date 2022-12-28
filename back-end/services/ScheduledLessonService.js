const ScheduledLesson = require('../models/ScheduledLesson');

const getAllLessons = async (date) => {
  if (date) {
    return await ScheduledLesson.find({ date: { $regex: date, $options: 'i' } });
  }
  return await ScheduledLesson.find({});
};

const getLessonById = async (id) => await ScheduledLesson.findById(id);

const scheduleLesson = async (lesson) => await ScheduledLesson.create(lesson);

const updateLesson = async (id, body) =>
  await ScheduledLesson.findByIdAndUpdate(id, body, { new: true, runValidators: true });

const deleteLesson = async (id) => await ScheduledLesson.findByIdAndDelete(id);

const checkTime = async (time) => {
  return Boolean(await ScheduledLesson.findOne({ date: time }));
};

module.exports = {
  getAllLessons,
  getLessonById,
  scheduleLesson,
  updateLesson,
  deleteLesson,
  checkTime,
};
