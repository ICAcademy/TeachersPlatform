const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    creatorId: {
      type: mongoose.ObjectId,
      required: true,
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
