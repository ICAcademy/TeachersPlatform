const {
  getQuestions,
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
    const question = await editQuestion(id);
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
  createNewQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
