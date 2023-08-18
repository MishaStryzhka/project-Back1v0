const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const updateCurrentUser = async (req, res, next) => {
  const { _id } = req.user;
  const { email, phones } = req.body;

  const user = await User.findById(_id);
  if (!user) {
    next(HttpError(401, 'Not authorized'));
  }

  console.log(req.file);
  console.log(req.body);
  // -> Check if new phone number already exist

  if (phones) {
    const phonesArr = phones.substring(1, phones.length - 1).split(',');
    let indexPhoneInUse = '';
    const isPhoneExist = phonesArr.some((phone) => {
      indexPhoneInUse = user.phones.indexOf(phone);
      return user.phones.indexOf(phone) >= 0;
    });
    if (isPhoneExist) {
      throw HttpError(409, `Phone ${user.phones[indexPhoneInUse]} in use`);
    }
    req.body.phones = phonesArr;
  }

  if (email) {
    throw HttpError(404, 'Not found');
  }

  const isNewEmailExist = await User.findOne({ email });

  if (isNewEmailExist) {
    throw HttpError(409, 'Email in use');
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { avatar: req.file.path, avatarPublicId: req.file.filename, ...req.body },
    {
      new: true,
    }
  );

  res.status(200).json({
    user: {
      userID: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      patronymic: updatedUser.patronymic,
      phones: updatedUser.phones,
      userType: updatedUser.userType,
      avatar: updatedUser.avatar,
    },
  });
};

module.exports = updateCurrentUser;
