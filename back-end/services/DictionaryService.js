const Dictionary = require.main.require('./models/Dictionary');

exports.getDictionaryByStudentId = async (studentId) =>
  await Dictionary.find({ studentId }).sort({ createdAt: -1 });

exports.getDictionaryByWord = async (search, studentId) =>
  await Dictionary.find({
    $and: [{ word: { $regex: search, $options: 'i' } }, { studentId }],
  });

exports.createDictionary = async (dictionary) => await Dictionary.create(dictionary);

exports.getDictionary = async (id) => await Dictionary.findById(id);

exports.updateDictionary = async (id, dictionary) =>
  await Dictionary.findByIdAndUpdate(id, dictionary, {
    new: true,
    runValidators: true,
  });

exports.deleteDictionary = async (id) => await Dictionary.findByIdAndDelete(id);

exports.matchWordAndTranslation = async (data) => {
  const dictionary = await Dictionary.find({
    studentId: data.studentId,
    word: { $regex: data.word, $options: 'i' },
    translation: { $regex: data.translation, $options: 'i' },
  });
  return dictionary;
};
