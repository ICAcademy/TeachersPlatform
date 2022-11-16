const UserModel = require('../models/User');

exports.createUser = async (_, res) => {
  try {
    const blog = await UserModel.create();
    res.json({ data: blog, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
