const {
  getDictionaryByStudentId,
  getAllDictionaries,
  createDictionary,
  getDictionaryById,
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

exports.getAllDictionaries = async (req, res) => {
  try {
    const { studentId } = req.query;
    const dictionary = studentId
      ? await getDictionaryByStudentId(studentId)
      : await getAllDictionaries();
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
