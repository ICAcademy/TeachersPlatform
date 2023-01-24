const Todo = require('../models/Todo');

const getAllTodoById = async (id) => await Todo.find({ studentId: id }).sort('-createdAt');
const getSingleTodoById = async (id) => await Todo.findById(id);
const createNewTodo = async (body) => await Todo.create(body);
const updateTodoById = async (id, body) =>
  await Todo.findByIdAndUpdate(id, body, { new: true, runValidators: true });
const deleteTodoById = async (id) => await Todo.findByIdAndDelete(id);

module.exports = {
  getAllTodoById,
  getSingleTodoById,
  createNewTodo,
  updateTodoById,
  deleteTodoById,
};
