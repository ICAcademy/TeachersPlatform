const express = require('express');

const {
  getAllQuestions,
  createNewQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/Questions');

const router = express.Router();

router.get('/', getAllQuestions);
router.post('/', createNewQuestion);
router.get('/:id', getQuestion);
router.patch('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
