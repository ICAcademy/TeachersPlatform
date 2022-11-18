const registerValidation = require('../helpers/validation');
const register = require('../services/AuthService');

exports.createUser = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const user = await register(req.body);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
