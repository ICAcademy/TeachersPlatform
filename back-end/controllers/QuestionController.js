const {
  getQuestions,
  getLevels,
  getUnitsByLevel,
  getDataByUrl,
  createQuestion,
  findQuestionById,
  editQuestion,
  removeQuestion,
  getQuestionsByUnitName,
  getTest,
} = require('../services/QuestionService');

const getAllQuestions = async (req, res) => {
  try {
    const { searchUnit } = req.query;
    const questions = searchUnit ? await getQuestionsByUnitName(searchUnit) : await getQuestions();
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
    res.sattus(400).json(error);
  }
};

const getTopicDataByUrl = async (req, res) => {
  try {
    const data = await getDataByUrl(req.query);
    res.status(200).json(data);
  } catch (error) {
    res.sattus(400).json(error);
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

const getTestByLevelAndUnit = async (req, res) => {
  try {
    const { level, unit } = req.query;
    const questions = await getTest(level, unit);
    res.json(questions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionLevels,
  getQuestionUnitsByLevel,
  getTopicDataByUrl,
  createNewQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getTestByLevelAndUnit,
};
