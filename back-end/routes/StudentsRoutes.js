const express = require('express');

const {
  getAllStudents,
  createStudents,
  getStudentsById,
  updateStudents,
  deleteStudents,
} = require('../controllers/StudentsController');

const router = express.Router();

// router.route('/').get(getAllStudents).post(createStudents);
// router.route('/:id').get(getStudentsById).put(updateStudents).delete(deleteStudents);

router.get('/get-all-students', getAllStudents);
router.post('/create-students', createStudents);
router.get('/get-all-students/:id', getStudentsById);
router.put('/update-students/:id', updateStudents);
router.delete('/delete-students/:id', deleteStudents);

module.exports = router;
