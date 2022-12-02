const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.statics.findWithFilter = function (search) {
  const regex = new RegExp(search, 'i');
  console.log(regex);
  const query = this.find({ unit: { $regex: regex } });
  console.log(query);

  return query;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
