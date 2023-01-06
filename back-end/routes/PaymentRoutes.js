const express = require('express');
const { providePayment } = require('../controllers/PaymentController');

const router = express.Router();

router.post('/', providePayment);

module.exports = router;
