const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const updateCurrentUser = async (req, res, next) => {
  const { _id } = req.user;
  const { name, email, birthday, phone, city } = req.body;

  const user = await User.findById(_id);
  if (!user) {
    next(HttpError(401, 'Not authorized'));
  }

  const isNewEmailExist = await User.findOne({ email });

  if (isNewEmailExist) {
    throw HttpError(409, 'Email in use');
  }

  if (req.file) {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name,
        email,
        birthday,
        phone,
        city,
        avatar: req.file.originalname,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      User: {
        name: updatedUser.name,
        email: updatedUser.email,
        birthday: updatedUser.birthday,
        phone: updatedUser.phone,
        city: updatedUser.city,
        avatar: updatedUser.avatarURL,
      },
    });
  } else {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name,
        email,
        birthday,
        phone,
        city,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      User: {
        name: updatedUser.name,
        email: updatedUser.email,
        birthday: updatedUser.birthday,
        phone: updatedUser.phone,
        city: updatedUser.city,
        avatar: updatedUser.avatarURL,
      },
    });
  }
};

module.exports = updateCurrentUser;
