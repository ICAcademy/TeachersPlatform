const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    questions: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          answers: {
            type: [String],
            required: true,
          },
          correct: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true },
);

const Question = mongoose.model('Questions', questionSchema);

module.exports = Question;
