const MaterialModel = require('../models/Material');

exports.getAllMaterials = async () => {
  return await MaterialModel.find();
};

exports.getMaterialsByUnit = async (unitName) => {
  return await MaterialModel.find({ unit: { $regex: unitName, $options: 'i' } });
};

exports.createMaterial = async (material) => {
  return await MaterialModel.create(material);
};

exports.getMaterialById = async (id) => {
  return await MaterialModel.findById(id);
};

exports.updateMaterial = async (id, material) => {
  return await MaterialModel.findByIdAndUpdate(id, material);
};

exports.deleteMaterial = async (id) => {
  return await MaterialModel.findByIdAndDelete(id);
};

exports.getLevels = async () => {
  return await MaterialModel.distinct('level');
};

exports.getUnitsByLevel = async (level) => {
  return await MaterialModel.aggregate([
    {
      $match: { level: { $eq: level } },
    },
    {
      $project: {
        _id: 1,
        level: 1,
        unit: 1,
        image: 1,
        url: 1,
        numberOfLessons: {
          $cond: { if: { $isArray: '$lessons' }, then: { $size: '$lessons' }, else: null },
        },
      },
    },
  ]);
};

exports.getMaterialByUrl = async (url) => {
  return await MaterialModel.findOne({
    url: { $eq: url },
  });
};

exports.matchMaterials = async (data) => {
  return await MaterialModel.find({ level: data.level, unit: data.unit });
};
