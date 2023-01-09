const {
  getDictionaryByStudentId,
  createDictionary,
  getDictionaryById,
  getDictionaryByWord,
  updateDictionary,
  deleteDictionary,
} = require('../services/DictionaryService');

exports.createDictionary = async (req, res) => {
  try {
    const dictionary = await createDictionary(req.body);
    res.status(201).json(dictionary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDictionaryByStudentId = async (req, res) => {
  try {
    const { studentId, search } = req.query;
    const dictionary =
      search && studentId
        ? await getDictionaryByWord(search, studentId)
        : await getDictionaryByStudentId(studentId);
    res.status(200).json(dictionary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDictionaryById = async (req, res) => {
  try {
    const dictionary = await getDictionaryById(req.params.id);
    res.status(200).json(dictionary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateDictionary = async (req, res) => {
  try {
    const dictionary = await updateDictionary(req.params.id, req.body);
    res.status(200).json(dictionary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDictionary = async (req, res) => {
  try {
    const dictionary = await deleteDictionary(req.params.id);
    res.status(200).json(dictionary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
