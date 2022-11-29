const express = require('express');

const {
  getAllMaterials,
  createMaterial,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
} = require('../controllers/MaterialController');

const router = express.Router();

router.route('/').get(getAllMaterials);
router.route('/').post(createMaterial);
router.route('/:id').get(getMaterialById);
router.route('/:id').patch(updateMaterial);
router.route('/:id').delete(deleteMaterial);

module.exports = router;
