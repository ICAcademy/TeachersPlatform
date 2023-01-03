const ScheduledLesson = require('../models/ScheduledLesson');

const getAllLessons = async (id, minDate, maxDate) => {
  if (minDate && maxDate) {
    return await ScheduledLesson.find({ id, date: { $gte: minDate, $lte: maxDate } }).sort({
      date: 1,
    });
  }
  return await ScheduledLesson.find({ id });
};

const getLessonById = async (id) => await ScheduledLesson.findById(id);

const scheduleLesson = async (lesson) => await ScheduledLesson.create(lesson);

const updateLesson = async (id, body) =>
  await ScheduledLesson.findByIdAndUpdate(id, body, { new: true, runValidators: true });

const deleteLesson = async (id) => await ScheduledLesson.findByIdAndDelete(id);

const alreadySelectedTime = async (time, id) => {
  const lesson = await ScheduledLesson.findOne({ date: time });
  if (lesson && String(lesson._id) === id) {
    return false;
  }
  return Boolean(lesson);
};

module.exports = {
  getAllLessons,
  getLessonById,
  scheduleLesson,
  updateLesson,
  deleteLesson,
  alreadySelectedTime,
};
