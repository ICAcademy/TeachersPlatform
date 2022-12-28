const express = require('express');
const { createTransaction, getAllTransactions } = require('../controllers/TransactionController');

const router = express.Router();

router.route('/').get(getAllTransactions);
router.route('/').post(createTransaction);

module.exports = router;
