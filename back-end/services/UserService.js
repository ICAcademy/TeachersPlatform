const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const findByEmail = async (email) => await User.findOne({ email });

const updateByID = async (id, body) => {
  return await User.findByIdAndUpdate(id, body, { new: true, runValidators: true }).select(
    '-password',
  );
};

const findRoleId = async (email) => {
  const student = await Student.findOne({ email });
  const teacher = await Teacher.findOne({ email });

  return student || teacher;
};

module.exports = { findByEmail, updateByID, findRoleId };
