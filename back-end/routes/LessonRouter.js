const express = require('express');
const {
  getAllLessons,
  startNewLesson,
  updateActiveLesson,
} = require('../controllers/LessonController');

const router = express.Router();

router.get('/', getAllLessons);
router.post('/', startNewLesson);
router.patch('/:id', updateActiveLesson);

module.exports = router;
