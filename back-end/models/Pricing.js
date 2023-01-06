const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pricingSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    description: { type: JSON, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Pricing', pricingSchema);
