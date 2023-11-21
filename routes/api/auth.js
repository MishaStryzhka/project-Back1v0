const express = require('express');

const {
  validateBody,
  authenticate,
  upload,
  passport,
} = require('../../middlewares');

const {
  registerSchema,
  loginSchema,
  updateSchema,
  updateUserTypeSchema,
  refreshPasswordSchema,
  refreshEmailSchema,
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
router.get('/user/:id', ctrl.getUserById);

// upload.fields([{name: "avatar", maxCount: 1}, {name: certificates, maxCount: 50}])
// upload.array("avatar", 9)
router.put(
  '/current/update',
  authenticate,
  validateBody(updateSchema),
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'certificates', maxCount: 50 },
    { name: 'workExamples', maxCount: 50 },
  ]),
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

router.patch(
  '/current/refreshEmail',
  authenticate,
  validateBody(refreshEmailSchema),
  ctrl.refreshEmail
);

module.exports = router;
