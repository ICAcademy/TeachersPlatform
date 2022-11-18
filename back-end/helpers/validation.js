/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
const Joi = require('joi');

const schema = Joi.object({
  fullName: Joi.string().regex(new RegExp('^[a-zA-Z]{2,16}( {1,2}[a-zA-Z]{2,16}){0,}$')).required(),
  dateOfBirth: Joi.string().required(),
  email: Joi.string()
    .regex(new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$'))
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.)()]).{8,10}$')).required(),
  repeatPassword: Joi.ref('password'),
}).with('password', 'repeatPassword');

const registerValidation = (data) => schema.validate(data);

module.exports = registerValidation;
