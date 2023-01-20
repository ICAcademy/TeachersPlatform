const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    token: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      expires: 36000,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Token', tokenSchema);
