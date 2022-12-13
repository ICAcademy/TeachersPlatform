const jwt = require('jsonwebtoken');

// Helpers
const registerValidation = require('../helpers/validation');

// Services
const { createStudent } = require('../services/StudentService');
const { createTeacher } = require('../services/TeacherService');
const { register, login, findByEmail, findRoleId, updateUser } = require('../services/AuthService');

// Constants
const { TEACHER } = require('../constants/UserRoles');

const createRoleForUser = async (role, data) => {
  if (role === TEACHER) {
    return await createTeacher(data);
  }
  return await createStudent(data);
};

exports.createUser = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);

    const user = await findByEmail(req.body.email);

    if (user) {
      return res.status(400).json({ message: 'User with that email address already exists' });
    }
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    register(req.body);
    await createRoleForUser(req.body.role, req.body);
    const { _id } = await findRoleId(req.body.email);
    const createdUser = await findByEmail(req.body.email);
    await updateUser(createdUser._id, { roleId: _id });
    res.status(201).json({ message: 'User was successfully created!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const token = await login(req.body);

    if (!token) {
      return res.status(400).json({ message: 'User was not found!' });
    }
    res.status(200).json({ message: 'User was successfully logged!', token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
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
