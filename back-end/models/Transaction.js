const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  transaction_id: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String },
  end_date: { type: String, required: true },
  dae: { type: JSON, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);
