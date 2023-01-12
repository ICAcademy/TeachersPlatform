const { getLessonsById, startLesson, endLesson } = require('../services/LessonService');

const getAllLessons = async (req, res) => {
  try {
    const { id } = req.query;

    const lessons = await getLessonsById(id);

    res.status(200).json(lessons);
  } catch (error) {
    res.status(400).json(error);
  }
};

const startNewLesson = async (req, res) => {
  try {
    const body = req.body;

    const startedLesson = await startLesson(body);

    res.status(201).json(startedLesson);
  } catch (error) {
    res.status(400).json(error);
  }
};

const endActiveLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const finishedLesson = await endLesson(id);

    res.status(200).json(finishedLesson);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getAllLessons, startNewLesson, endActiveLesson };
