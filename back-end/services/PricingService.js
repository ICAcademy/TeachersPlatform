const PricingModel = require('../models/Pricing');

exports.getAllPricing = async () => {
  return await PricingModel.find();
};

exports.createPricing = async (pricing) => {
  return await PricingModel.create(pricing);
};

exports.updatePricing = async (id, pricing) => {
  return await PricingModel.findByIdAndUpdate(id, pricing);
};

exports.deletePricing = async (id) => {
  return await PricingModel.findByIdAndDelete(id);
};
