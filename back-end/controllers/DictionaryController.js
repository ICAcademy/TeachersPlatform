// Helpers
const dictionaryValidation = require.main.require('./helpers/dictionaryValidation');

// Services
const {
  getDictionaryByStudentId,
  createDictionary,
  getDictionary,
  getDictionaryByWord,
  updateDictionary,
  deleteDictionary,
  matchWordAndTranslation,
} = require.main.require('./services/DictionaryService');

exports.createDictionary = async (req, res) => {
  try {
    const { error } = dictionaryValidation(req.body);

    const word = await matchWordAndTranslation(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    if (word.length !== 0) {
      throw new Error('This word already exist');
    }

    const dictionary = await createDictionary(req.body);
    res.status(201).json(dictionary);
  } catch ({ message }) {
    res.status(400).json(message);
  }
};

exports.getDictionaryByStudentId = async (req, res) => {
  try {
    const { studentId, search } = req.query;
    const dictionary = search
      ? await getDictionaryByWord(search, studentId)
      : await getDictionaryByStudentId(studentId);
    res.json(dictionary);
  } catch ({ message }) {
    res.status(400).json(message);
  }
};

exports.getDictionary = async (req, res) => {
  try {
    const dictionary = await getDictionary(req.params.id);
    res.json(dictionary);
  } catch ({ message }) {
    res.status(400).json(message);
  }
};

exports.updateDictionary = async (req, res) => {
  try {
    const dictionary = await updateDictionary(req.params.id, req.body);
    res.json(dictionary);
  } catch ({ message }) {
    res.status(400).json(message);
  }
};

exports.deleteDictionary = async (req, res) => {
  try {
    const dictionary = await deleteDictionary(req.params.id);
    res.json(dictionary);
  } catch ({ message }) {
    res.status(400).json(message);
  }
};
