const {
  getAllTodoById,
  getSingleTodoById,
  createNewTodo,
  updateTodoById,
  deleteTodoById,
} = require('../services/TodoService');

const getAllTodo = async (req, res) => {
  try {
    const { id } = req.query;

    const allTodo = await getAllTodoById(id);

    res.status(200).json(allTodo);
  } catch (error) {
    res.status(400).json(error);
  }
};
const getSingleTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await getSingleTodoById(id);

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
};
const createTodo = async (req, res) => {
  try {
    const body = req.body;

    const todo = await createNewTodo(body);

    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
};
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const todo = await updateTodoById(id, body);

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await deleteTodoById(id);

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllTodo,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
