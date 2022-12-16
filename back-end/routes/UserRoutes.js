const express = require('express');
const { updateUserById } = require('../controllers/UserController');

const router = express.Router();

router.patch('/:id', updateUserById);

module.exports = router;
