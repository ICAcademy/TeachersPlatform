/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
const Joi = require('joi');

const schema = Joi.object({
  studentId: Joi.string().required(),
  word: Joi.string().regex(new RegExp('^[a-zA-Z]{1,20}$')).required(),
  translation: Joi.string().regex(new RegExp('^[А-ЩЬЮЯҐЄІЇа-щьюяґєії]{1,20}$')).required(),
});

const dictionaryValidation = (data) => schema.validate(data);

module.exports = dictionaryValidation;
