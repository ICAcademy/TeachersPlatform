const Material = require('../models/Material');
const errorHandler = require('../helpers/errorHandler');

const materialFilterMiddleware = async (req, res, next) => {
  try {
    const { search } = req.query;
    const data = await Material.find({ unit: { $regex: search, $options: 'i' } });
    res.status(201).json(data);
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports = materialFilterMiddleware;
