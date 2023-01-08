const {
  getAllLessons,
  getLessonById,
  scheduleSingleLesson,
  scheduleMultipleLessons,
  updateLesson,
  deleteLesson,
  alreadySelectedTime,
} = require('../services/ScheduledLessonService');

const getAllScheduledLessons = async (req, res) => {
  try {
    const { id, minDate, maxDate } = req.query;
    const lessons = await getAllLessons(id, minDate, maxDate);
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
    const { repeat } = req.query;
    const body = req.body;

    if (repeat == 'true') {
      const lessons = await scheduleMultipleLessons(req.body);

      if (!lessons) {
        return res
          .status(400)
          .json({ field: 'time', msg: 'There is another lesson scheduled for this time' });
      }
      return res.status(200).json(lessons);
    }

    const isTimeAlreadyTaken = await alreadySelectedTime(body.date, '', body.teacherId);

    if (isTimeAlreadyTaken) {
      return res
        .status(400)
        .json({ field: 'time', msg: 'There is another lesson scheduled for this time' });
    }

    const lesson = await scheduleSingleLesson(body);
    res.status(200).json(lesson);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateScheduledLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const isTimeAlreadyTaken = await alreadySelectedTime(req.body.date, id, req.body.teacherId);

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
