const mongoose = require('mongoose');

const scheduledLessonSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    teacherId: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'Teacher',
    },
    studentId: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'Student',
    },
  },
  { timestamps: true },
);

const ScheduledLesson = mongoose.model('ScheduledLesson', scheduledLessonSchema);

module.exports = ScheduledLesson;
