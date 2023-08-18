const { ctrlWrapper } = require('../../helpers');
const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const updateCurrentUser = require('./updateCurrentUser');
const updateUserType = require('./updateUserType');
const deleteById = require('./deleteById');

const googleAuth = require('./googleAuth');
const facebookAuth = require('./facebookAuth');

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateCurrentUser: ctrlWrapper(updateCurrentUser),
  googleAuth: ctrlWrapper(googleAuth),
  updateUserType: ctrlWrapper(updateUserType),
  deleteById: ctrlWrapper(deleteById),
  facebookAuth: ctrlWrapper(facebookAuth),
};
