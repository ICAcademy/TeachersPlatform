const jwt = require('jsonwebtoken');
const registerValidation = require('../helpers/validation');
const { register, login, findByEmail } = require('../services/AuthService');

exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const { error } = registerValidation(req.body);

    const candidate = await findByEmail(email);

    if (candidate) {
      return res.status(400).json({ message: 'A user with that name already exists' });
    }
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    register(req.body);
    res.status(200).json({ message: 'User was successfully created!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

let token;

exports.loginUser = async (req, res) => {
  try {
    const data = req.body;
    token = await login(data, res);

    if (!token) {
      return res.status(400).json({ message: 'User was not found!' });
    }
    res.status(200).json({ message: 'User was successfully logged!', token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAuthorizedUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authorization is failed!');
    }

    const decode = jwt.verify(token, 'secretValue');
    const authorizedUser = decode?.email;

    const user = await findByEmail(authorizedUser);
    if (!user) {
      res.status(401).json({ message: 'User was not found!' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
