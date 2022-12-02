const questionsService = require('../services/Questions');

exports.getFilteredQuestions = async (req, res) => {
  try {
    const questions = await questionsService.getQuestions();
    const filteredQuestions = questions.filter((question) => question.level === req.params.level);
    res.json(filteredQuestions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
