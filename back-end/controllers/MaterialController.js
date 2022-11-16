const materialService = require('../services/MaterialService');

exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await materialService.getAllMaterials();
    res.json({ data: materials, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMaterial = async (req, res) => {
  try {
    const material = await materialService.createMaterial(req.body);
    res.json({ data: material, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMaterialById = async (req, res) => {
  try {
    const material = await materialService.getMaterialById(req.params.id);
    res.json({ data: material, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMaterial = async (req, res) => {
  try {
    const material = await materialService.updateMaterial(
      req.params.id,
      req.body
    );
    res.json({ data: material, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMaterial = async (req, res) => {
  try {
    const material = await materialService.deleteMaterial(req.params.id);
    res.json({ data: material, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
