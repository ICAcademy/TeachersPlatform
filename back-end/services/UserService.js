const User = require('../models/User');

const getUserById = async (id) => {
  return User.findById(id);
};

const findByEmail = async (email) => {
  const user = await User.findOne({ email }).select(['-password']);
  return user;
};

const updateByID = async (id, body) => {
  return await User.findByIdAndUpdate(id, body, { new: true, runValidators: true }).select(
    '-password',
  );
};

const getCurrentPassword = async (id) => await User.findById(id).select('password');

module.exports = { getUserById, findByEmail, updateByID, getCurrentPassword };
