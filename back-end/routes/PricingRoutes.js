const express = require('express');
const {
  getAllPricing,
  createPricing,
  updatePricing,
  deletePricing,
} = require('../controllers/PricingController');

const router = express.Router();

router.route('/').get(getAllPricing);
router.route('/').post(createPricing);
router.route('/:id').put(updatePricing);
router.route('/:id').delete(deletePricing);

module.exports = router;
