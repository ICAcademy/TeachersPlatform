const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string()
    .regex(new RegExp('^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'))
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});

const emailValidation = (data) => schema.validate(data);

module.exports = emailValidation;
