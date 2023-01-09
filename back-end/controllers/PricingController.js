const pricingService = require('../services/PricingService');

exports.getAllPricing = async (req, res) => {
  try {
    const pricing = await pricingService.getAllPricing();
    res.json(pricing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createPricing = async (req, res) => {
  try {
    const pricing = await pricingService.createPricing(req.body);
    res.json(pricing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePricing = async (req, res) => {
  try {
    const pricing = await pricingService.updatePricing(req.params.id, req.body);
    res.json(pricing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePricing = async (req, res) => {
  try {
    const pricing = await pricingService.deletePricing(req.params.id);
    res.json(pricing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
