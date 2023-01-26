const { ADMIN } = require('../constants/UserRoles');
const User = require('../models/User');

const findByEmail = async (email) => {
  const user = await User.findOne({ email }).select(['-password']);
  if (user.role === ADMIN) {
    return user;
  }
  return user.populate({
    path: 'roleId',
    select: 'level',
  });
};

const updateByID = async (id, body) => {
  return await User.findByIdAndUpdate(id, body, { new: true, runValidators: true }).select(
    '-password',
  );
};

const getCurrentPassword = async (id) => await User.findById(id).select('password');

module.exports = { findByEmail, updateByID, getCurrentPassword };
