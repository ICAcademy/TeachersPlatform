const express = require('express');
const { getAllTeachers } = require('../controllers/TeacherController');

const router = express.Router();

router.route('/get-all-teachers').get(getAllTeachers);

module.exports = router;

