const dayjs = require('dayjs');

const ScheduledLesson = require('../models/ScheduledLesson');

const getAllLessons = async (id, minDate, maxDate) => {
  if (minDate && maxDate) {
    return await ScheduledLesson.find({
      $or: [{ teacherId: id }, { studentId: id }],
      date: { $gte: minDate, $lte: maxDate },
    })
      .populate({
        path: 'studentId',
        select: 'fullName',
      })
      .sort({
        date: 1,
      });
  }
  return await ScheduledLesson.find({}).sort({ date: 1 });
};

const getLessonById = async (id) => await ScheduledLesson.findById(id);

const scheduleSingleLesson = async (lesson) =>
  await ScheduledLesson.create(lesson).populate({
    path: 'studentId',
    select: 'fullName',
  });

const scheduleMultipleLessons = async (lesson) => {
  let date = lesson.date;
  const lessons = [];
  const endOfMonth = dayjs(date).endOf('month');

  while (dayjs(date).isBefore(endOfMonth)) {
    const timeIsTaken = await alreadySelectedTime(date, '', lesson.teacherId);
    if (timeIsTaken) {
      return null;
    }
    lessons.push({ ...lesson, date: dayjs(date).format('YYYY/MM/DD HH:mm') });
    date = dayjs(date).add(1, 'week');
  }

  const scheduledLessons = await ScheduledLesson.create(lessons);
  return await ScheduledLesson.populate(scheduledLessons, {
    path: 'studentId',
    select: 'fullName',
  });
};

const updateLesson = async (id, body) =>
  await ScheduledLesson.findByIdAndUpdate(id, body, { new: true, runValidators: true }).populate({
    path: 'studentId',
    select: 'fullName',
  });

const deleteLesson = async (id) => await ScheduledLesson.findByIdAndDelete(id);

const alreadySelectedTime = async (time, lessonId, teacherId) => {
  const lesson = await ScheduledLesson.findOne({ date: time, teacherId });
  if (lesson && String(lesson._id) === lessonId) {
    return false;
  }
  return Boolean(lesson);
};

module.exports = {
  getAllLessons,
  getLessonById,
  scheduleSingleLesson,
  scheduleMultipleLessons,
  updateLesson,
  deleteLesson,
  alreadySelectedTime,
};
