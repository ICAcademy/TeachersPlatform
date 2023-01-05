const transactionService = require('../services/TransactionService');

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions(req);
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

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.deleteTransaction(req.params.id);
    res.json(transaction);
  } catch (error) {
    console.log(error);
  }
};
