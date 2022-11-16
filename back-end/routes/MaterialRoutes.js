const express = require('express');

const {
  getAllMaterials,
  createMaterial,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
} = require('../controllers/MaterialController');

const router = express.Router();

router.route('/').get(getAllMaterials).post(createMaterial);
router
  .route('/:id')
  .get(getMaterialById)
  .put(updateMaterial)
  .delete(deleteMaterial);

module.exports = router;
