const jwt = require('jsonwebtoken');

const { findByEmail, updateByID } = require('../services/UserService');

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authorization is failed!');
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
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

module.exports = { getUser, updateUserById };
