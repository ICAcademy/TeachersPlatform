const express = require('express');
const router = express.Router();

const {
  getAllTeachers,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/TeacherController');

router.get('/', getAllTeachers);
router.post('/', createTeacher);
router.get('/:id', getTeacherById);
router.patch('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

module.exports = router;
