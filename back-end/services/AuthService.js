const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcryptjs');
const bcryptSalt = process.env.BCRYPT_SALT;
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const sendMail = require('./nodemailer');
const { FORGOT_PASSWORD, CHANGED_PASSWORD } = require('../constants/emailSend');

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

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error('User does not exist');
  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();
  let resetToken = crypto.lib.WordArray.random(32).toString(crypto.enc.Hex);
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `localhost:3000/reset-password?token=${resetToken}&id=${user._id}`;
  await sendMail(user.email, user.fullName, FORGOT_PASSWORD, null, link);
  return link;
};

const resetPassword = async (userId, token, password) => {
  let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error('Invalid or expired password reset token');
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error('Invalid or expired password reset token');
  }
  const hash = await bcrypt.hash(password, Number(bcryptSalt));
  await User.updateOne({ _id: userId }, { $set: { password: hash } }, { new: true });
  const user = await User.findById({ _id: userId });
  sendMail(user.email, user.fullName, CHANGED_PASSWORD);
  await passwordResetToken.deleteOne();
  return true;
};

module.exports = {
  register,
  login,
  comparePasswords,
  hashPassword,
  createToken,
  requestPasswordReset,
  resetPassword,
};
