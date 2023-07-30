const Joi = require('joi');

const updateSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string(),
  birthday: Joi.date(),
  phone: Joi.number(),
  city: Joi.string(),
});

module.exports = updateSchema;
