const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema(
  {
    level: { type: String, required: true },
    unit: { type: String, required: true },
    image: { type: String },
    url: { type: String, required: true },
    lessons: [
      {
        title: { type: String, required: true },
        layout: { type: JSON },
      },
    ],
  },
  { timestamps: true },
);

materialSchema.index({ title: 'unit' });

module.exports = mongoose.model('Material', materialSchema);
