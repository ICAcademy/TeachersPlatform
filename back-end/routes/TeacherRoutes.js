const express = require('express');
const {
  getAllTeachers,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/TeacherController');

const router = express.Router();

router.route('/get-all-teachers').get(getAllTeachers);
router.route('/create-teacher').post(createTeacher);
router.route('/get-teacher/:id').get(getTeacherById);
router.route('/update-teacher/:id').put(updateTeacher);
router.route('/delete-teacher/:id').delete(deleteTeacher);

module.exports = router;

