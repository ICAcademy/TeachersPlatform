const express = require('express');

const {
  getAllMaterials,
  createMaterial,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
  getMaterialByUrl,
} = require('../controllers/MaterialController');

const router = express.Router();

router.route('/').get(getAllMaterials);
router.route('/').post(createMaterial);
router.route('/:id').get(getMaterialById);
router.route('/:id').patch(updateMaterial);
router.route('/:id').delete(deleteMaterial);
router.route('/get-material-by-url/:url').get(getMaterialByUrl);

module.exports = router;
