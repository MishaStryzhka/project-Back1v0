const Joi = require('joi');

const refreshPassword = Joi.object({
  password: Joi.string().required().min(6),
  newPassword: Joi.string().required().min(6),
});

module.exports = refreshPassword;
