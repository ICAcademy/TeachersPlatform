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
  getCountOfQuestionTopicsByLevel,
  getCountOfQuestionTopicsByUnit,
} = require('../services/QuestionService');

const getCorrectFilter = (units, count) => {
  const unitsMap = units.map((unit, index) => {
    return { ...unit, numberOfLessons: count[index].count };
  });

  const result = unitsMap.map((item) => {
    return { ...item._doc, numberOfLessons: item.numberOfLessons };
  });

  return result;
};

const getAllQuestions = async (req, res) => {
  try {
    const { searchUnit } = req.query;
    const count = await getCountOfQuestionTopicsByUnit(searchUnit);
    const questions = searchUnit ? await getQuestionsByUnitName(searchUnit) : await getQuestions();
    const result = await getCorrectFilter(questions, count);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getQuestionLevels = async (req, res) => {
  try {
    const levels = await getLevels();
    res.status(200).json(levels);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getQuestionUnitsByLevel = async (req, res) => {
  try {
    const { level } = req.query;
    const units = await getUnitsByLevel({ level });
    const count = await getCountOfQuestionTopicsByLevel(level);
    const result = getCorrectFilter(units, count);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
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

module.exports = {
  getAllQuestions,
  getQuestionLevels,
  getQuestionUnitsByLevel,
  getTopicDataByUrl,
  createNewQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
