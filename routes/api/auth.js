const express = require('express');

const {
  validateBody,
  authenticate,
  uploadUserAvatar,
  passport,
} = require('../../middlewares');

const {
  registerSchema,
  loginSchema,
  updateSchema,
  updateUserTypeSchema,
  refreshPasswordSchema,
} = require('../../schemas/users');

const router = express.Router();

const ctrl = require('../../controllers/auth');

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  ctrl.googleAuth
);

router.post('/register', validateBody(registerSchema), ctrl.register);
router.post('/login', validateBody(loginSchema), ctrl.login);
router.post('/logout', authenticate, ctrl.logout);
router.get('/current', authenticate, ctrl.getCurrentUser);
router.put(
  '/current/update',
  authenticate,
  validateBody(updateSchema),
  uploadUserAvatar.single('avatar'),
  ctrl.updateCurrentUser
);
router.patch(
  '/current/userType',
  authenticate,
  validateBody(updateUserTypeSchema),
  ctrl.updateUserType
);

router.delete('/delete', authenticate, ctrl.deleteById);

router.patch(
  '/current/refreshPassword',
  authenticate,
  validateBody(refreshPasswordSchema),
  ctrl.refreshPassword
);

module.exports = router;
