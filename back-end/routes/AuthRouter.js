const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.post('/register', AuthController.createUser);
router.post('/login', AuthController.loginUser);
router.get('/authorized-user', AuthController.getAuthorizedUser);

module.exports = router;
