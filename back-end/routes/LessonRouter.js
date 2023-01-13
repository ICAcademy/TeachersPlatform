const express = require('express');
const {
  getAllLessons,
  getSingleLesson,
  startNewLesson,
  updateActiveLesson,
} = require('../controllers/LessonController');

const router = express.Router();

router.get('/', getAllLessons);
router.get('/:id', getSingleLesson);
router.post('/', startNewLesson);
router.patch('/:id', updateActiveLesson);

module.exports = router;
