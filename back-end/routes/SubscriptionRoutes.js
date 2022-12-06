const express = require('express');

const { createSubscription } = require('../controllers/SubscriptionController');

const router = express.Router();

router.post('/', createSubscription);

module.exports = router;
