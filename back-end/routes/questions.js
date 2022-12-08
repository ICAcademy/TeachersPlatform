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
  filteredQuestion,
} = require('../controllers/Questions');

const router = express.Router();

router.get('/', getAllQuestions);
router.get('/levels', getQuestionLevels);
router.get('/units', getQuestionUnitsByLevel);
router.get('/url', getTopicDataByUrl);
router.get('/filter', filteredQuestion);
router.post('/', createNewQuestion);
router.get('/:id', getQuestionById);
router.patch('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
