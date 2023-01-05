const express = require('express');
const {
  getAllTeachers,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/TeacherController');

const router = express.Router();

router.route('/').get(getAllTeachers);
router.route('/').post(createTeacher);
router.route('/:id').get(getTeacherById);
router.route('/:id').put(updateTeacher);
router.route('/:id').delete(deleteTeacher);

module.exports = router;
