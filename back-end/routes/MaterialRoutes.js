const express = require('express');

const {
  getAllMaterials,
  createMaterial,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
  getLevels,
  getUnitsByLevel,
  getMaterialByUrl,
} = require('../controllers/MaterialController');

const router = express.Router();

router.route('/').get(getAllMaterials);
router.route('/create-material').post(createMaterial);
router.route('/get-material/:id').get(getMaterialById);
router.route('/update-material/:id').patch(updateMaterial);
router.route('/delete-material/:id').delete(deleteMaterial);
router.route('/get-levels').get(getLevels);
router.route('/get-units-by-level/:level').get(getUnitsByLevel);
router.route('/get-material-by-url/:url').get(getMaterialByUrl);

module.exports = router;
