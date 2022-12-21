const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { findByEmail, updateByID, updatePassword } = require('../services/UserService');

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authorization is failed!');
    }

    const decode = jwt.verify(token, 'secretValue');
    const authorizedUser = decode.email;

    const user = await findByEmail(authorizedUser);
    if (!user) {
      res.status(401).json({ message: 'User was not found!' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await updateByID(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { id } = req.params;
    const userPass = await updatePassword(id);
    const isValidPassword = await bcrypt.compare(currentPassword, userPass.password);
    if (!isValidPassword) {
      return res.status(400).send('Please enter correct old password');
    }
    const hashedPass = await bcrypt.hash(newPassword, 10);
    userPass.password = hashedPass;
    await userPass.save();
    res.json({ message: 'password updated' });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = { getUser, updateUserById, changePassword };
