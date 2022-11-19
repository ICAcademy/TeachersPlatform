const express = require('express');

const {
  getAllMaterials,
  createMaterial,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
  getLevels,
  getUnitsByLevel,
} = require('../controllers/MaterialController');

const router = express.Router();

router.route('/').get(getAllMaterials).post(createMaterial);
router.route('/levels').get(getLevels);
router.route('/:level').get(getUnitsByLevel);
router.route('/:id').get(getMaterialById).put(updateMaterial).delete(deleteMaterial);

module.exports = router;
