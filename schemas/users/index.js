const loginSchema = require('./loginSchema');
const registerSchema = require('./registerSchema');
const updateSchema = require('./updateSchema');
const updateUserTypeSchema = require('./updateUserTypeSchema');
const refreshPasswordSchema = require('./refreshPasswordSchema');
const refreshEmailSchema = require('./refreshEmailSchema');

module.exports = {
  loginSchema,
  registerSchema,
  updateSchema,
  updateUserTypeSchema,
  refreshPasswordSchema,
  refreshEmailSchema,
};
