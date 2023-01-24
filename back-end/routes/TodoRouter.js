const express = require('express');

const {
  getAllTodo,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/TodoController');

const router = express.Router();

router.get('/', getAllTodo);
router.get('/:id', getSingleTodo);
router.post('/', createTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
