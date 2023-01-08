const TransactionModel = require('../models/Transaction');

exports.getAllTransactions = async (req) => {
  const ITEMS_PER_PAGE = 5;
  const page = req.query.page || 1;
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const count = await TransactionModel.count();
  const items = await TransactionModel.find()
    .sort({ end_date: -1 })
    .limit(ITEMS_PER_PAGE)
    .skip(skip);
  const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

  return {
    pagination: {
      count,
      pageCount,
    },
    items,
  };
};

exports.createTransation = async (transaction) => {
  const decodedTransaction = Buffer.from(transaction.data, 'base64').toString('utf8');
  const transactionObj = JSON.parse(decodedTransaction);

  console.log(transactionObj);

  return await TransactionModel.create(transactionObj);
};

exports.deleteTransaction = async (id) => {
  return await TransactionModel.findByIdAndDelete(id);
};
