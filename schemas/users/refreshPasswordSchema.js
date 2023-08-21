const Joi = require('joi');

const loginSchema = Joi.object({
  password: Joi.string().required().min(6),
  newPassword: Joi.string().required().min(6),
});

module.exports = loginSchema;
