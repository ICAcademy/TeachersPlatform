const Joi = require('joi');

const schema = Joi.object({
  password: Joi.string()
    .regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[/#?!@$%^&*-.)()]).{8,10}$'))
    .required(),
});

const forgotPasswordValidation = (data) => schema.validate(data);

module.exports = forgotPasswordValidation;
