const express = require('express');

const { getFilteredQuestions } = require('../controllers/FilterQuestionsController');

const router = express.Router();

router.route('/:level').get(getFilteredQuestions);

module.exports = router;
