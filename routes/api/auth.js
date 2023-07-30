const express = require('express');
const {
  validateBody,
  authenticate,
  uploadUserAvatar,
} = require('../../middlewares');
const {
  registerSchema,
  loginSchema,
  updateSchema,
} = require('../../schemas/users');

const router = express.Router();

const ctrl = require('../../controllers/auth');

router.post('/register', validateBody(registerSchema), ctrl.register);
router.post('/login', validateBody(loginSchema), ctrl.login);
router.post('/logout', authenticate, ctrl.logout);
router.get('/current', authenticate, ctrl.getCurrentUser);
router.patch(
  '/current/update',
  authenticate,
  validateBody(updateSchema),
  uploadUserAvatar.single('avatar'),
  ctrl.updateCurrentUser
);

module.exports = router;