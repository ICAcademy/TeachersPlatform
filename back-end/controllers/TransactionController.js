const transactionService = require('../services/TransactionService');

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.createTransation(req.body);
    res.json(transaction);
  } catch (error) {
    console.log(error);
  }
};
