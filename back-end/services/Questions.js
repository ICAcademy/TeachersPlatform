const Question = require('../models/Question');

const getQuestions = async (queryParams) => {
  try {
    const criterias = queryParams;

    if (criterias.fields === 'level') {
      return await Question.distinct(criterias.fields);
    }

    if (Object.keys(criterias).length && criterias.fields) {
      const fields = criterias.fields.split(',');
      return await Question.find(criterias).select(fields);
    }

    return await Question.find(criterias);
  } catch (error) {
    throw new Error(error);
  }
};

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
