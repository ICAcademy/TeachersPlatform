const TransactionModel = require('../models/Transaction');

exports.getAllTransactions = async () => {
  return await TransactionModel.find();
};

exports.createTransation = async (transaction) => {
  const decodedTransaction = Buffer.from(transaction.data, 'base64').toString('utf8');
  const transactionObj = JSON.parse(decodedTransaction);
  console.log(transaction);

  return await TransactionModel.create(transactionObj);
};
