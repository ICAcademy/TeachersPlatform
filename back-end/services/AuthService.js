const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = (data) => {
  bcrypt.hash(data.password, 10, (err, hashedPass) => {
    if (err) {
      throw new Error('Something went wrong');
    }

    User.create({
      fullName: data.fullName,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      password: hashedPass,
      repeatPassword: hashedPass,
    });
  });
  return data;
};

module.exports = register;
