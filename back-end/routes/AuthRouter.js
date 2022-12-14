const express = require('express');
const AuthController = require('../controllers/AuthController');
const { getUser } = require('../controllers/UserController');

const router = express.Router();

router.post('/register', AuthController.createUser);
router.post('/login', AuthController.loginUser);
router.get('/me', getUser);

module.exports = router;
