const express = require('express');

const {
  getAllStudents,
  createStudents,
  getStudentsById,
  updateStudents,
  deleteStudents,
} = require('../controllers/StudentsController');

const router = express.Router();

router.get('/get-all-students', getAllStudents);
router.post('/create-students', createStudents);
router.get('/get-all-students/:id', getStudentsById);
router.put('/update-students/:id', updateStudents);
router.delete('/delete-students/:id', deleteStudents);

module.exports = router;
