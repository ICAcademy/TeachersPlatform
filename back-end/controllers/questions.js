const {
  getQuestions,
  createQuestion,
  findQuestion,
  editQuestion,
  removeQuestion,
} = require('../services/Questions');

const getAllQuestions = async (req, res) => {
  try {
    const questions = await getQuestions(req.query);
    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createNewQuestion = async (req, res) => {
  try {
    const question = await createQuestion(req.body);
    res.status(201).json({ question });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await findQuestion(id);
    if (!question) {
      return res.status(404).json({ msg: `There is no question with id: ${id}` });
    }
    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await editQuestion(id, req.body);
    if (!question) {
      return res.status(404).json({ msg: `There is no question with id: ${id}` });
    }
    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await removeQuestion(id);
    if (!question) {
      return res.status(404).json({ msg: `There is no question with id: ${id}` });
    }
    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getAllQuestions,
  createNewQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
