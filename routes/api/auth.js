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

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  ctrl.facebookAuth
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

router.delete('/current', authenticate, ctrl.deleteById);

module.exports = router;
