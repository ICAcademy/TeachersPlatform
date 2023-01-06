const express = require('express');

const {
  getAllScheduledLessons,
  getScheduledLesson,
  createScheduledLesson,
  updateScheduledLesson,
  deleteScheduledLesson,
} = require('../controllers/ScheduledLessonController');

const router = express.Router();

router.get('/', getAllScheduledLessons);
router.get('/:id', getScheduledLesson);
router.post('/', createScheduledLesson);
router.patch('/:id', updateScheduledLesson);
router.delete('/:id', deleteScheduledLesson);

module.exports = router;
