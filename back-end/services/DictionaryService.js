const DictionaryModel = require('../models/Dictionary');

exports.getDictionaryByStudentId = async (studentId) => {
  return await DictionaryModel.find({ studentId });
};

exports.getDictionaryByWord = async (search, studentId) => {
  return await DictionaryModel.find({
    $and: [{ word: { $regex: search, $options: 'i' } }, { studentId }],
  });
};

exports.createDictionary = async (dictionary) => {
  return await DictionaryModel.create(dictionary);
};

exports.getDictionaryById = async (id) => {
  return await DictionaryModel.findById(id);
};

exports.updateDictionary = async (id, dictionary) => {
  return await DictionaryModel.findByIdAndUpdate(id, dictionary);
};

exports.deleteDictionary = async (id) => {
  return await DictionaryModel.findByIdAndDelete(id);
};
