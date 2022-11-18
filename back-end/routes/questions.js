const express = require('express');

const {
  getAllQuestions,
  createNewQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/Questions');

const router = express.Router();

router.get('/', getAllQuestions);
router.post('/', createNewQuestion);
router.get('/:id', getQuestionById);
router.patch('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
