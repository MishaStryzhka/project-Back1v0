const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const updateCurrentUser = async (req, res, next) => {
  const { _id } = req.user;
  const {
    email,
    phones,
    educations,
    paymentMethods,
    jobs,
    problemsItSolves,
    directionsOfWork,
  } = req.body;

  const user = await User.findById(_id);
  if (!user) {
    next(HttpError(401, 'Not authorized'));
  }

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

  let educationsArr;
  if (educations) {
    educationsArr = JSON.parse(req.body.educations);
    req.body.educations = educationsArr;
  }

  // -> Add / Update payment method
  if (paymentMethods) {
    const paymentMethodArr = paymentMethods
      .substring(1, paymentMethods.length - 1)
      .split(',');
    req.body.paymentMethods = paymentMethodArr;
  }

  // -> Add / Update Doctor job
  if (jobs) {
    // const a = [
    //   {
    //     name: 'DENTIST',
    //     cityArea: 'Kiev',
    //     address: 'Heroiv Urkainu 3',
    //     workSchedule: [{ begin: 9, end: 3 }],
    //     receptionHours: [{ begin: 11, end: 15 }],
    //   },
    // ];
    // console.log(JSON.stringify(a));
    req.body.jobs = JSON.parse(jobs);
  }

  // -> Set / Update User Avatar
  if (req.files.avatar) {
    req.body.avatar = req.files.avatar[0].path;
    req.body.avatarPublicId = req.files.avatar[0].filename;
  }

  // -> Set / Update User Certificates
  if (req.files.certificates) {
    if (req.body.certificates) {
      req.files.certificates.map((el) =>
        req.body.certificates.push({
          path: el.path,
          certificatePublicID: el.filename,
        })
      );
    }
    req.body.certificates = [];
    req.files.certificates.map((el) =>
      req.body.certificates.push({
        path: el.path,
        certificatePublicID: el.filename,
      })
    );
  }

  // -> Set / Update Problems that doctor treat
  if (problemsItSolves) {
    console.log(req.user);
    const problemsItSolvesArr = problemsItSolves
      .substring(1, problemsItSolves.length - 1)
      .split(',');
    req.body.problemsItSolves = [
      ...req.user.problemsItSolves,
      ...problemsItSolvesArr,
    ];
  }

  // -> Set / Update Problems that doctor treat
  if (directionsOfWork) {
    const directionsOfWorkArr = directionsOfWork
      .substring(1, directionsOfWork.length - 1)
      .split(',');
    req.body.directionsOfWork = [
      ...req.user.directionsOfWork,
      ...directionsOfWorkArr,
    ];
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { ...req.body },
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
      experienceYears: updatedUser.experienceYears,
      avatar: updatedUser.avatar,
      educations: updatedUser.educations,
      paymentMethods: updatedUser.paymentMethods,
      jobs: updatedUser.jobs,
      certificates: updatedUser.certificates,
      directionsOfWork: updatedUser.directionsOfWork,
      problemsItSolves: updatedUser.problemsItSolves,
    },
  });
};

module.exports = updateCurrentUser;
