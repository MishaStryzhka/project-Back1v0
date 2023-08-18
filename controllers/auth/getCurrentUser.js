const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const getCurrentUser = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    next(HttpError(401, 'Not authorized'));
  }

  console.log(user);
  res.status(200).json({
    user: {
      userID: user.id,
      userType: user.userType,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      patronymic: user.patronymic,
      avatar: user.avatar,
      provider: user.provider,
    },
  });
};

module.exports = getCurrentUser;
