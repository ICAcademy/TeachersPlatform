const express = require('express');
const {
  updateUserById,
  changePassword,
  forgotPassword,
  changeForgotPassword,
} = require('../controllers/UserController');

const router = express.Router();

router.patch('/change-password/:id', changePassword);

router.get('/forgot-pasword', forgotPassword);

router.patch('/change-forgotten-password', changeForgotPassword);

router.patch('/:id', updateUserById);

module.exports = router;
