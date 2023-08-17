const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const updateUserType = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw HttpError(401, 'Not authorized');
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
    new: true,
  });

  res.status(200).json({
    user: {
      userID: updatedUser.id,
      userType: updatedUser.userType,
    },
  });
};

module.exports = updateUserType;
