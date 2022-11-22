const express = require('express');

const {
  getAllQuestions,
  getQuestionLevels,
  getQuestionUnitsByLevel,
  getQuestionTopicsByUnit,
  getQuestionQuizByTopic,
  createNewQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/Questions');

const router = express.Router();

router.get('/', getAllQuestions);
router.get('/levels', getQuestionLevels);
router.get('/units', getQuestionUnitsByLevel);
router.get('/topics', getQuestionTopicsByUnit);
router.get('/quiz', getQuestionQuizByTopic);
router.post('/', createNewQuestion);
router.get('/:id', getQuestionById);
router.patch('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
