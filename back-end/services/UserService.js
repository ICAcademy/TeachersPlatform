const User = require('../models/User');

const findByEmail = async (email) => await User.findOne({ email });

const updateByID = async (id, body) => {
  return await User.findByIdAndUpdate(id, body, { new: true, runValidators: true }).select(
    '-password',
  );
};

const updatePassword = async (id) => await User.findById(id).select('password');

module.exports = { findByEmail, updateByID, updatePassword };
