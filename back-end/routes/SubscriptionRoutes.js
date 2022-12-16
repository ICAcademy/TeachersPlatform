const express = require('express');

const {
  getAllSubscriptions,
  getTeachersSubscriptions,
  createSubscription,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} = require('../controllers/SubscriptionController');

const router = express.Router();

router.get('/', getAllSubscriptions);
router.post('/', createSubscription);
router.get('/:id', getSubscriptionById);
router.get('/teachers-subscription/:id', getTeachersSubscriptions);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

module.exports = router;
