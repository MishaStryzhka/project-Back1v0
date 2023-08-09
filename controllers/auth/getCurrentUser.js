const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const getCurrentUser = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    next(HttpError(401, 'Not authorized'));
  }
  res.status(200).json({
    user: {
      name: user.name,
      email: user.email,
      userType: user.userType,
    },
  });
};

module.exports = getCurrentUser;
