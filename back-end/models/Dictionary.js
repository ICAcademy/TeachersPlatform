const { Schema, model } = require('mongoose');

const dictionarySchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = model('Dictionary', dictionarySchema);