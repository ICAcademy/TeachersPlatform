// Services
const { findByEmail } = require('../services/AuthService');

exports.getUser = async (req, res) => {
  console.log(req.userEmail);
  try {
    const user = await findByEmail(req.userEmail);
    if (!user) {
      res.status(400).json({ message: 'User was not found!' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
