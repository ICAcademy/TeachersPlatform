const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    studentId: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'Student',
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
