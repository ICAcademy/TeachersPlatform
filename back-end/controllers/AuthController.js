// Helpers
const registerValidation = require('../helpers/validation');

// Services
const { createStudent } = require('../services/StudentService');
const { createTeacher } = require('../services/TeacherService');
const { register, login, findByEmail } = require('../services/AuthService');

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
    const { email } = req.body;
    const { error } = registerValidation(req.body);

    const user = await findByEmail(email);

    if (user) {
      return res.status(400).json({ message: 'A user with that email address already exists' });
    }
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    register(req.body);
    await createRoleForUser(req.body.role, req.body);
    res.status(200).json({ message: 'User was successfully created!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const data = req.body;
    const token = await login(data);

    if (!token) {
      return res.status(400).json({ message: 'User was not found!' });
    }
    res.status(200).json({ message: 'User was successfully logged!', token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
