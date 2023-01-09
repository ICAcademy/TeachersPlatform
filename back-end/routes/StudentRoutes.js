const express = require('express');
const router = express.Router();

const {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/StudentController');

router.get('/', getAllStudents);
router.post('/', createStudent);
router.get('/:id', getStudentById);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
