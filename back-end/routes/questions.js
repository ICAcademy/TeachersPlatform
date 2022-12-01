const express = require('express');

const {
  getAllQuestions,
  getQuestionLevels,
  getQuestionUnitsByLevel,
  createNewQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/Questions');

const router = express.Router();

router.get('/', getAllQuestions);
router.get('/levels', getQuestionLevels);
router.get('/units', getQuestionUnitsByLevel);
router.post('/', createNewQuestion);
router.get('/:id', getQuestionById);
router.patch('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
