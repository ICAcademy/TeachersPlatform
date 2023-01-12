const DictionaryModel = require.main.require('./models/Dictionary');

exports.getDictionaryByStudentId = async (studentId) =>
  await DictionaryModel.find({ studentId }).sort({ createdAt: -1 });

exports.getDictionaryByWord = async (search, studentId) =>
  await DictionaryModel.find({
    $and: [{ word: { $regex: search, $options: 'i' } }, { studentId }],
  });

exports.createDictionary = async (dictionary) => await DictionaryModel.create(dictionary);

exports.getDictionary = async (id) => await DictionaryModel.findById(id);

exports.updateDictionary = async (id, dictionary) =>
  await DictionaryModel.findByIdAndUpdate(id, dictionary, {
    new: true,
    runValidators: true,
  });

exports.deleteDictionary = async (id) => await DictionaryModel.findByIdAndDelete(id);
