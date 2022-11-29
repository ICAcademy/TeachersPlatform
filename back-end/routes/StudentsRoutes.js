const express = require('express');

const {
  getAllStudents,
  createStudents,
  getStudentsById,
  updateStudents,
  deleteStudents,
} = require('../controllers/StudentsController');

const router = express.Router();

router.get('/', getAllStudents);
router.post('/', createStudents);
router.get('/:id', getStudentsById);
router.put('/:id', updateStudents);
router.delete('/:id', deleteStudents);

module.exports = router;
