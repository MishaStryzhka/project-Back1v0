const Joi = require('joi');

const updateUserTypeSchema = Joi.object({
  userType: Joi.string().required().valid('patient', 'doctor'),
});

module.exports = updateUserTypeSchema;
