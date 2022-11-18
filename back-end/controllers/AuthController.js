const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    let user = new User({
      fullName: req.body.fullName,
      dateBirth: req.body.dateBirth,
      email: req.body.email,
      password: hashedPass,
    });

    user
      .save()
      .then(() => {
        return res.json({
          message: 'User added successfully!',
        });
      })
      .catch((err) => {
        return res.json({
          message: console.error(err),
        });
      });
  });
};

module.exports = { register };
