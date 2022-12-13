const express = require('express');

const {
  getAllSubscriptions,
  createSubscription,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getUserSubscriptions,
} = require('../controllers/SubscriptionController');

const router = express.Router();

router.get('/', getAllSubscriptions);
router.get('/user/:id', getUserSubscriptions);
router.post('/', createSubscription);
router.get('/:id', getSubscriptionById);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

module.exports = router;
