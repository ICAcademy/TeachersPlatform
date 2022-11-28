// helpers
const registerValidation = require('../helpers/validation');

// services
const { createStudents } = require('../services/StudentsService');
const { createTeacher } = require('../services/TeacherService');
const register = require('../services/AuthService');

const createRoleForUser = async (role, data) => {
  if (role === 'teacher') {
    await createTeacher(data);
  } else {
    await createStudents(data);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    await register(req.body);
    res.status(200).json({ message: 'User was successfully created!' });
    await createRoleForUser(req.body.role, req.body);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
