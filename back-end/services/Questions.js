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

const createQuestion = async (question) => {
  try {
    return await Question.create(question);
  } catch (error) {
    throw new Error(error);
  }
};

const findQuestion = async (id) => {
  try {
    return await Question.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const editQuestion = async (id, body) => {
  try {
    return await Question.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  } catch (error) {
    throw new Error(error);
  }
};

const removeQuestion = async (id) => {
  try {
    return await Question.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getQuestions,
  createQuestion,
  findQuestion,
  editQuestion,
  removeQuestion,
};
