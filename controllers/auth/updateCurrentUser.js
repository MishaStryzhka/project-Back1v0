const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const updateCurrentUser = async (req, res, next) => {
  const { _id } = req.user;
  const { email, firstName, lastName, patronymic, phones, userType } = req.body;

  const user = await User.findById(_id);
  if (!user) {
    next(HttpError(401, 'Not authorized'));
  }

  let phonesArr = [];
  if (phones) {
    phonesArr = phones.substring(1, phones.length - 1).split(',');
    let indexPhoneInUse = '';
    const isPhoneExist = phonesArr.some((phone) => {
      indexPhoneInUse = user.phones.indexOf(phone);
      return user.phones.indexOf(phone) >= 0;
    });
    if (isPhoneExist) {
      throw HttpError(409, `Phone ${user.phones[indexPhoneInUse]} in use`);
    }
  }

  const isNewEmailExist = await User.findOne({ email });

  if (isNewEmailExist) {
    throw HttpError(409, 'Email in use');
  }

  if (req.file) {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        email,
        firstName,
        lastName,
        patronymic,
        $push: { phones: { $each: phonesArr } },
        userType,
        // avatar: req.file.originalname,
      },

      {
        new: true,
      }
    );

    res.status(200).json({
      user: {
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        patronymic: updatedUser.patronymic,
        phones: updatedUser.phones,
        userType: updatedUser.userType,
        userID: updatedUser._id,
        // avatar: updatedUser.avatarURL,
      },
    });
  } else {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        email,
        firstName,
        lastName,
        patronymic,
        $push: { phones: { $each: phonesArr } },
        userType,
      },

      {
        new: true,
      }
    );

    res.status(200).json({
      user: {
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        patronymic: updatedUser.patronymic,
        phones: updatedUser.phones,
        userType: updatedUser.userType,
        userID: updatedUser._id,
      },
    });
  }
};

module.exports = updateCurrentUser;
