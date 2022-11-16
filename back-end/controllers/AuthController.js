const User = require('../models/User');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    console.log(hashedPass);

    let user = new User({
      fullName: req.body.fullName,
      dateBirth: req.body.dateBirth,
      email: req.body.email,
      password: hashedPass,
      retypePassword: hashedPass,
    });

    user
      .save()
      .then(() => {
        return res.json({
          message: 'User added successfully!',
        });
      })
      .catch((err) => {
        return res.json(err);
      });
  });
};

module.exports = { register };
