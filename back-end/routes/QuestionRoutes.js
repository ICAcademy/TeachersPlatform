const express = require('express');

const {
  getAllQuestions,
  getQuestionLevels,
  getQuestionUnitsByLevel,
  getTopicDataByUrl,
  createNewQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getTestByUrl,
} = require('../controllers/QuestionController');

const router = express.Router();

router.get('/', getAllQuestions);
router.get('/levels', getQuestionLevels);
router.get('/units', getQuestionUnitsByLevel);
router.get('/url', getTopicDataByUrl);
router.post('/', createNewQuestion);
router.get('/:id', getQuestionById);
router.get('/get-test-by-url/:url', getTestByUrl);
router.patch('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
