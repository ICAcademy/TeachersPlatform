const express = require('express');
const {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
} = require('../controllers/TransactionController');

const router = express.Router();

router.route('/').get(getAllTransactions);
router.route('/').post(createTransaction);
router.route('/:id').delete(deleteTransaction);

module.exports = router;
