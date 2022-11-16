const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema(
  {
    title: { type: String, required: true },
    level: { type: String, required: true },
    unit: { type: String, required: true },
    lessons: [{ type: JSON, required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Material', materialSchema);
