const express = require('express');
const { updateUserById, changePassword } = require('../controllers/UserController');

const router = express.Router();

router.patch('/change-password/:id', changePassword);

router.patch('/:id', updateUserById);

module.exports = router;
