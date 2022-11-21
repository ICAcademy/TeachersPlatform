/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
const Joi = require('joi');

const schema = Joi.object({
  role: Joi.string().required(),
  fullName: Joi.string()
    .regex(new RegExp('^([A-Z][a-z]{1,15} )([A-Z][a-z]{1,15}){0,30}$'))
    .required(),
  dateOfBirth: Joi.string().required(),
  email: Joi.string()
    .regex(new RegExp('^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'))
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[/#?!@$%^&*-.)()]).{8,10}$'))
    .required(),
});

const registerValidation = (data) => schema.validate(data);

module.exports = registerValidation;
