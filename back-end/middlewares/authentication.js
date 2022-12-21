const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Authentication failed!',
    });
  }
};

module.exports = authentication;
