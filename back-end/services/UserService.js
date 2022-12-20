const User = require('../models/User');

const findByEmail = async (email) => {
  const user = await User.findOne({ email }).select(['-password']);
  return user;
};

const updateByID = async (id, body) => {
  return await User.findByIdAndUpdate(id, body, { new: true, runValidators: true }).select(
    '-password',
  );
};

module.exports = { findByEmail, updateByID };
