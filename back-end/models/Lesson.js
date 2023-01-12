const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.ObjectId,
      required: true,
    },
    studentId: {
      type: mongoose.ObjectId,
      required: true,
    },
    teacherStatus: {
      type: String,
      enum: ['online', 'offline'],
      default: 'online',
      required: true,
    },
    studentStatus: {
      type: String,
      enum: ['online', 'offline'],
      default: 'offline',
      required: true,
    },
    lessonStatus: {
      type: String,
      enum: ['processing', 'ended'],
      default: 'processing',
      required: true,
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
          selected: {
            type: String,
          },
        },
      ],
    },
  },
  { timestamps: true },
);

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
