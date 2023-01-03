const {
  getUserById,
  findByEmail,
  updateByID,
  getCurrentPassword,
} = require('../services/UserService');
const { comparePasswords, hashPassword } = require('../services/AuthService');
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
  try {
    const user = await findByEmail(req.user.email);
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
    await updateByID(id, req.body);
    const user = await findByEmail(req.body.email);
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '2h' });
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { id } = req.params;
    const userPass = await getCurrentPassword(id);
    const isValidPassword = await comparePasswords(currentPassword, userPass.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Please enter correct old password' });
    }
    const hashedPass = await hashPassword(newPassword);
    userPass.password = hashedPass;
    await userPass.save();
    res.json({ message: 'password updated' });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = { getUser, updateUserById, changePassword };
