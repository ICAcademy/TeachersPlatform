// Services
const { findByEmail, updateByID, getCurrentPassword } = require('../services/UserService');
const { comparePasswords, hashPassword } = require('../services/AuthService');
const { updateTeacher } = require('../services/TeacherService');
const { updateStudent, addAvatarToStudent } = require('../services/StudentService');

// Constants
const { STUDENT, TEACHER } = require('../constants/UserRoles');

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
    const user = await updateByID(id, req.body);
    if (req.body.url) {
      if (user.role === STUDENT) {
        await addAvatarToStudent(user.roleId, req.body);
      }
      if (user.role === TEACHER) {
        await updateTeacher(user.roleId, req.body);
      }
    }
    res.status(200).json(user);
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
