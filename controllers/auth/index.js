const { ctrlWrapper } = require('../../helpers');
const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const updateCurrentUser = require('./updateCurrentUser');

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateCurrentUser: ctrlWrapper(updateCurrentUser),
};
