const Question = require('../models/Question');

const getQuestions = async () => await Question.find({});

const getLevels = async () => await Question.distinct('level');

const getUnitsByLevel = async (level) => {
  const countOfTopics = await Question.aggregate([
    {
      $match: { level: { $eq: level.level } },
    },
    {
      $sortByCount: '$unit',
    },
  ]);
  const questions = await Question.find(level);
  const duplicateFilter = questions.reduce((acc, curr) => {
    if (
      !acc.some((item) => {
        return item.unit === curr.unit;
      })
    ) {
      acc.push({ ...curr._doc });
    }
    return acc;
  }, []);

  const result = duplicateFilter.map((item, index) => {
    return { ...item, numberOfLessons: countOfTopics[index].count };
  });

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
  const countOfTopics = await Question.aggregate([
    {
      $match: { unit: { $regex: search, $options: 'i' } },
    },
    {
      $sortByCount: '$unit',
    },
  ]);
  const duplicateFilter = questions.reduce((acc, curr) => {
    if (
      !acc.some((item) => {
        return item.unit === curr.unit;
      })
    ) {
      acc.push({ ...curr._doc });
    }
    return acc;
  }, []);

  const result = duplicateFilter.map((item, index) => {
    return { ...item, numberOfLessons: countOfTopics[index].count };
  });

  return result;
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
};
