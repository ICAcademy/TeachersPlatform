// Helpers
const registerValidation = require('../helpers/validation');

// Services
const { createStudent } = require('../services/StudentService');
const { createTeacher } = require('../services/TeacherService');
const { register, login, requestPasswordReset, resetPassword } = require('../services/AuthService');
const { findByEmail } = require('../services/UserService');
const sendMail = require('../services/nodemailer');

// Constants
const { TEACHER } = require('../constants/UserRoles');
const { REGISTRATION } = require('../constants/emailSend');

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

    const { _id: roleId } = await createRoleForUser(req.body.role, req.body);
    register({ ...req.body, roleId });
    await sendMail(req.body.email, req.body.fullName, REGISTRATION);
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

exports.resetPasswordController = async (req, res) => {
  try {
    const { email, userId, token, password } = req.body;
    if (email) {
      const link = await requestPasswordReset(email);
      return res.status(201).json({ link });
    }
    const resetPasswordService = await resetPassword(userId, token, password);
    return res.status(200).json(resetPasswordService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
