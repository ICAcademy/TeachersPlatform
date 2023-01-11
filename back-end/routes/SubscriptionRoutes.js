const express = require('express');

const {
  getAllSubscriptions,
  createSubscription,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getStudentSubscriptions,
  getTeacherSubscriptions,
  getSubcriptionsByStatus,
} = require('../controllers/SubscriptionController');

const router = express.Router();

router.get('/', getAllSubscriptions);
router.post('/', createSubscription);
router.get('/:id', getSubscriptionById);
router.get('/teacher-subscription/:id', getTeacherSubscriptions);
router.get('/student-subscription/:id', getStudentSubscriptions);
router.patch('/update-subscription/:id', updateSubscription);
router.delete('/delete-subscription/:id', deleteSubscription);

module.exports = router;
