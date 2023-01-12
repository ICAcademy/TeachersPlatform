const express = require('express');
const {
  getAllLessons,
  startNewLesson,
  endActiveLesson,
} = require('../controllers/LessonController');

const router = express.Router();

router.get('/', getAllLessons);
router.post('/', startNewLesson);
router.patch('/:id', endActiveLesson);

module.exports = router;
