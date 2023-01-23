const Question = require('../models/Question');

const getQuestions = async () => await Question.find({});

const getLevels = async () => await Question.distinct('level');

const getUnitsByLevel = async (level) => {
  const countOfTopics = await Question.aggregate([
    {
      $match: { level: { $eq: level.level } },
    },
    {
      $group: {
        _id: '$unit',
        level: { $first: '$level' },
        unit: { $first: '$unit' },
        topic: { $first: '$topic' },
        questions: { $first: '$questions' },
        url: { $first: '$url' },
        numberOfLessons: { $sum: 1 },
      },
    },
  ]);
  return countOfTopics;
};

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

const getQuestionsByUnitName = async (search) => {
  const countOfTopics = await Question.aggregate([
    {
      $match: { unit: { $regex: search, $options: 'i' } },
    },
    {
      $group: {
        _id: '$unit',
        level: { $first: '$level' },
        unit: { $first: '$unit' },
        topic: { $first: '$topic' },
        questions: { $first: '$questions' },
        url: { $first: '$url' },
        numberOfLessons: { $sum: 1 },
      },
    },
  ]);
  return countOfTopics;
};

const getTest = async (level, unit) => {
  return await Question.find({
    $and: [{ level }, { unit }],
  });
};

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
  getTest,
};
