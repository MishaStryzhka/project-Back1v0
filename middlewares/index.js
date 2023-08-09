const authenticate = require('./authenticate');
const validateBody = require('./validateBody');
const uploadUserAvatar = require('./uploadUserAvatar');
const validateQuery = require('./validateQuery');
const validateId = require('./validateId');
const uploadCloud = require('./uploadCloud');
const passport = require('./google-authenticate');

module.exports = {
  validateBody,
  authenticate,
  uploadUserAvatar,
  validateQuery,
  validateId,
  uploadCloud,
  passport,
};
