const MaterialModel = require('../models/Material');

exports.getAllMaterials = async () => {
  return await MaterialModel.find();
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
      $project: { level: 1, unit: 1, image: 1 },
    },
  ]);
};
