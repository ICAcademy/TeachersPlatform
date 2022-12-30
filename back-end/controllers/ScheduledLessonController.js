const {
  getAllLessons,
  getLessonById,
  scheduleLesson,
  updateLesson,
  deleteLesson,
  alreadySelectedTime,
} = require('../services/ScheduledLessonService');

const getAllScheduledLessons = async (req, res) => {
  try {
    const { minDate, maxDate } = req.query;
    const lessons = await getAllLessons(minDate, maxDate);
    res.status(200).json(lessons);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getScheduledLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await getLessonById(id);
    res.status(200).json(lesson);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createScheduledLesson = async (req, res) => {
  try {
    const isTimeAlreadyTaken = await alreadySelectedTime(req.body.date, '');
    if (isTimeAlreadyTaken) {
      return res
        .status(400)
        .json({ field: 'time', msg: 'There is another lesson scheduled for this time' });
    }

    const lesson = await scheduleLesson(req.body);
    res.status(200).json(lesson);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateScheduledLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const isTimeAlreadyTaken = await alreadySelectedTime(req.body.date, id);

    if (isTimeAlreadyTaken) {
      return res
        .status(400)
        .json({ field: 'time', msg: 'There is another lesson scheduled for this time' });
    }
    const updatedLesson = await updateLesson(id, req.body);
    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteScheduledLesson = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteLesson(id);
    res.status(200).json({ msg: 'Lesson successfully delete' });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllScheduledLessons,
  getScheduledLesson,
  createScheduledLesson,
  updateScheduledLesson,
  deleteScheduledLesson,
};
