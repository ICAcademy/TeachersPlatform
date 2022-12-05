const materialService = require('../services/MaterialService');

exports.getAllMaterials = async (req, res) => {
  try {
    const { unitName } = req.query;
    const materials = await materialService.getAllMaterials(unitName);
    res.json(materials);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createMaterial = async (req, res) => {
  try {
    const material = await materialService.createMaterial(req.body);
    res.json(material);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMaterialById = async (req, res) => {
  try {
    const material = await materialService.getMaterialById(req.params.id);
    res.json(material);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateMaterial = async (req, res) => {
  try {
    const material = await materialService.updateMaterial(req.params.id, req.body);
    res.json(material);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMaterial = async (req, res) => {
  try {
    const material = await materialService.deleteMaterial(req.params.id);
    res.json(material);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLevels = async (req, res) => {
  try {
    const levels = await materialService.getLevels();
    res.json(levels);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUnitsByLevel = async (req, res) => {
  try {
    const units = await materialService.getUnitsByLevel(req.params.level);
    res.json(units);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMaterialByUrl = async (req, res) => {
  try {
    const material = await materialService.getMaterialByUrl(req.params.url);
    res.json(material);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
