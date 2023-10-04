const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const getCurrentUser = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log('user', user);

  if (!user) {
    next(HttpError(401, 'Not authorized'));
  }

  const {
    id: userID,
    userType,
    email,
    firstName,
    lastName,
    patronymic,
    age,
    phones,
    contactMethods,
    directionsOfWork,
    problemsItSolves,
    avatar,
    provider,
    educations,
    jobs,
    certificates,
  } = user;

  console.log(user);
  res.status(200).json({
    user: {
      userID,
      userType,
      email,
      firstName,
      lastName,
      patronymic,
      age,
      phones,
      contactMethods,
      directionsOfWork,
      problemsItSolves,
      avatar,
      provider,
      educations,
      jobs,
      certificates,
    },
  });
};

module.exports = getCurrentUser;
