const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const refreshPassword = async (req, res) => {
  const { password: reqOldPassword, newPassword } = req.body;
  const { password: currentPassword } = req.user;

  if (reqOldPassword !== currentPassword) {
    throw HttpError(409, 'Not correct password');
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw HttpError(401, 'Not authorized');
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { password: newPassword },
    {
      new: true,
    }
  );

  res.status(200).json({
    user: {
      userID: updatedUser.id,
      userType: updatedUser.userType,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      patronymic: updatedUser.patronymic,
      avatar: updatedUser.avatar,
    },
  });
};

module.exports = refreshPassword;
