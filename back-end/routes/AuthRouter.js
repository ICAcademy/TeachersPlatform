const authentication = require('../middlewares/authentication');
const express = require('express');
const {
  createUser,
  loginUser,
  resetPasswordRequestController,
  resetPasswordController,
} = require('../controllers/AuthController');
const { getUser } = require('../controllers/UserController');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/me', authentication, getUser);
router.post('/request-reset-password', resetPasswordRequestController);
router.post('/reset-password', resetPasswordController);

module.exports = router;
