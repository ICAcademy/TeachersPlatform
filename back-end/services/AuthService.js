const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (data) => {
  const password = await hashPassword(data.password);
  User.create({
    role: data.role,
    roleId: data.roleId,
    fullName: data.fullName,
    dateOfBirth: data.dateOfBirth,
    age: data.age,
    email: data.email,
    password,
  });
};

const login = async (data) => {
  const email = data.email;
  const password = data.password;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User was not found!');
  }

  const passwords = await comparePasswords(password, user.password);
  if (!passwords) {
    throw new Error('Password do not match');
  }
  return createToken(user.email);
};

const comparePasswords = (pass1, pass2) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(pass1, pass2, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });

const hashPassword = (pass) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(pass, 10, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });

const createToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '30d' });
};

module.exports = { register, login, comparePasswords, hashPassword, createToken };
