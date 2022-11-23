const express = require('express');
const text = 'text';
text;
text;

const {
  getAllMaterials,
  createMaterial,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
} = require('../controllers/MaterialController');

const router = express.Router();

router.get('/', getAllMaterials);
router.post('/', createMaterial);
router.get('/:id', getMaterialById);
router.put('/:id', updateMaterial);
router.delete('/:id', deleteMaterial);

module.exports = router;
