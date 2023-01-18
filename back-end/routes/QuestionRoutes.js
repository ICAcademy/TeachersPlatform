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
  getTestByLevelAndUnit,
} = require('../controllers/QuestionController');

const router = express.Router();

router.get('/', getAllQuestions);
router.get('/levels', getQuestionLevels);
router.get('/units', getQuestionUnitsByLevel);
router.get('/url', getTopicDataByUrl);
router.get('/tests', getTestByLevelAndUnit);
router.post('/', createNewQuestion);
router.get('/:id', getQuestionById);
router.patch('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
