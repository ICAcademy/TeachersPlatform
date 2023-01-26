const User = require('../models/User');

const findByEmail = async (email) => {
  const user = await User.findOne({ email }).select(['-password']).populate({
    path: 'roleId',
    select: 'level',
  });
  return user;
};

const updateByID = async (id, body) => {
  return await User.findByIdAndUpdate(id, body, { new: true, runValidators: true }).select(
    '-password',
  );
};

const getCurrentPassword = async (id) => await User.findById(id).select('password');

module.exports = { findByEmail, updateByID, getCurrentPassword };
