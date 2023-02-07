const express = require('express');

const {
  createSubscription,
  getSubscriptionsByQueries,
  getUserSubscriptionsByStatus,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} = require('../controllers/SubscriptionController');

const router = express.Router();

router.post('/', createSubscription);
router.get('/', getSubscriptionsByQueries);
router.get('/by-status/', getUserSubscriptionsByStatus);
router.get('/:id', getSubscriptionById);
router.patch('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

module.exports = router;
