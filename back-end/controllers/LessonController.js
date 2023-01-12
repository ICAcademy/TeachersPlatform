const { getLessonsById, startLesson, updateLesson } = require('../services/LessonService');

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

const updateActiveLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const finishedLesson = await updateLesson(id, body);

    res.status(200).json(finishedLesson);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getAllLessons, startNewLesson, updateActiveLesson };
