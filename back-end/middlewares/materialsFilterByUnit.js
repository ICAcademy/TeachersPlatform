const Material = require('../models/Material');
const errorHandler = require('../helpers/errorHandler');

const materialsFilterByUnit = async (req, res, next) => {
  try {
    const { unitName } = req.query;
    const data = await Material.find({ unit: { $regex: unitName, $options: 'i' } });
    res.status(200).json(data);
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports = materialsFilterByUnit;
