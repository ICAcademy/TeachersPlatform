const jwt = require('jsonwebtoken');
const User = require('../models/User');

// const authentication = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decode = jwt.verify(token, 'secretValue');

//     req.user = decode;
//     next();
//   } catch (err) {
//     res.status(401).json({
//       message: 'Authentication failed!',
//     });
//   }
// };

// module.exports = authentication;

const authentication = (req, res) => {
  if (req.headers && req.headers.authorization) {
    let auth = req.headers.authorization.split(' ')[1],
      decoded;
    try {
      decoded = jwt.verify(auth, 'secretValue');
    } catch (e) {
      return res.status(401).send('unauthorized');
    }
    let userId = decoded.id;
    // Fetch the user by id
    User.findOne({ _id: userId }).then((user) => {
      return res.send(200).json({ message: 'Success!!!', user });
    });
  }
  return res.send(500).json({ message: 'Bad(....' });
};

authentication();

module.exports = authentication;
