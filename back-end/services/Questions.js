const Question = require('../models/Question');

const getQuestions = async () => await Question.find({});

const createQuestion = async (question) => await Question.create(question);

const findQuestionById = async (id) => await Question.findById(id);

const editQuestion = async (id, body) =>
  await Question.findByIdAndUpdate(id, body, { new: true, runValidators: true });

const removeQuestion = async (id) => await Question.findByIdAndDelete(id);

module.exports = {
  getQuestions,
  createQuestion,
  findQuestionById,
  editQuestion,
  removeQuestion,
};
