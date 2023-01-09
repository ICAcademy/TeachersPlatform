const DictionaryModel = require('../models/Dictionary');

exports.getAllDictionaries = async () => {
  return await DictionaryModel.find();
};

exports.getDictionaryByStudentId = async (studentId) => {
  return await DictionaryModel.find({ studentId });
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
