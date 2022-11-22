const {
  getQuestions,
  getLevels,
  getUnitsByLevel,
  getTopicsByUnit,
  getQuizByTopic,
  createQuestion,
  findQuestionById,
  editQuestion,
  removeQuestion,
} = require('../services/Questions');

const getAllQuestions = async (req, res) => {
  try {
    const questions = await getQuestions();
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getQuestionLevels = async (req, res) => {
  try {
    const levels = await getLevels();
    res.status(200).json(levels);
  } catch (error) {
    res.sattus(400).json(error);
  }
};

const getQuestionUnitsByLevel = async (req, res) => {
  try {
    const units = await getUnitsByLevel(req.query);
    res.status(200).json(units);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getQuestionTopicsByUnit = async (req, res) => {
  try {
    const topics = await getTopicsByUnit(req.query);
    res.status(200).json(topics);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getQuestionQuizByTopic = async (req, res) => {
  try {
    const quiz = await getQuizByTopic(req.query);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createNewQuestion = async (req, res) => {
  try {
    const question = await createQuestion(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await findQuestionById(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await editQuestion(id, req.body);
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await removeQuestion(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllQuestions,
  getQuestionLevels,
  getQuestionUnitsByLevel,
  getQuestionTopicsByUnit,
  getQuestionQuizByTopic,
  createNewQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
