// helpers
const registerValidation = require('../helpers/validation');

// services
const { createStudent } = require('../services/StudentService');
const { createTeacher } = require('../services/TeacherService');
const register = require('../services/AuthService');

// constants
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

    if (error) return res.status(400).send(error.details[0].message);

    await register(req.body);
    await createRoleForUser(req.body.role, req.body);
    res.status(200).json({ message: 'User was successfully created!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
