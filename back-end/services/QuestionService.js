const Question = require('../models/Question');

const getQuestions = async () => await Question.find({});

const getLevels = async () => await Question.distinct('level');

const getUnitsByLevel = async (level) => await Question.find(level).distinct('unit');

const getDataByUrl = async (url) => {
  const unitInfo = await Question.findOne(url).select('unit level');
  const topicsInfo = await Question.find(url).select('topic questions');
  return { unitInfo, topicsInfo };
};

const createQuestion = async (question) => await Question.create(question);

const findQuestionById = async (id) => await Question.findById(id);

const editQuestion = async (id, body) =>
  await Question.findByIdAndUpdate(id, body, { new: true, runValidators: true });

const removeQuestion = async (id) => await Question.findByIdAndDelete(id);

const getQuestionsByUnitName = async (search) =>
  await Question.find({
    unit: { $regex: search, $options: 'i' },
  }).distinct('unit');

module.exports = {
  getQuestions,
  getLevels,
  getUnitsByLevel,
  getDataByUrl,
  createQuestion,
  findQuestionById,
  editQuestion,
  removeQuestion,
  getQuestionsByUnitName,
};
