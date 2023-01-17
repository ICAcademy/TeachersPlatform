const Question = require('../models/Question');

const getQuestions = async () => await Question.find({});

const getLevels = async () => await Question.distinct('level');

const getUnitsByLevel = async (level) => {
  const questions = await Question.find(level);
  const result = questions.reduce((acc, curr) => {
    if (
      !acc.some((item) => {
        return item.unit === curr.unit;
      })
    ) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return result;
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
  const questions = await Question.find({ unit: { $regex: search, $options: 'i' } });
  const result = questions.reduce((acc, curr) => {
    if (
      !acc.some((item) => {
        return item.unit === curr.unit;
      })
    ) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return result;
};

const getTest = async (url) => {
  return await Question.findOne({
    url: { $eq: url },
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
