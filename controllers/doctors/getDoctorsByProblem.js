const { User } = require('../../models');

const getDoctorsByProblem = async (req, res, next) => {
  const { problemId } = req.params;

  // -> cityArea / Update payment method
  const cityArea =
    req.query.cityArea !== 'undefined'
      ? `${req.query.cityArea} район`
      : undefined;

  console.log('req.query', req.query);

  try {
    const filter = {
      [`problemsItSolves.${problemId}`]: { $exists: true },
    };

    if (cityArea) {
      filter['jobs.cityArea'] = cityArea;
    }

    if (req.query.hoursOfWork !== 'undefined') {
      filter['jobs.workSchedule'] = req.query.hoursOfWork;
    }

    if (req.query.experienceYears !== 'undefined') {
      // Parse the experience value and create the corresponding filter
      if (req.query.experienceYears === 'experienceYears<=5') {
        console.log('QQQ');
        filter.experienceYears = { $lte: 5 };
      } else if (req.query.experienceYears === 'experienceYears>=6<=10') {
        console.log('WWW');
        filter.experienceYears = { $gte: 6, $lte: 10 };
      } else if (req.query.experienceYears === 'experienceYears>=11<=15') {
        console.log('EEE');
        filter.experienceYears = { $gte: 11, $lte: 15 };
      } else if (req.query.experienceYears === 'experienceYears>=16') {
        console.log('RRR');
        filter.experienceYears = { $gte: 16 };
      }
    }

    const doctors = await User.find(filter);
    console.log('doctors', doctors);

    res.status(200).json(doctors);
  } catch (error) {
    console.error('Помилка при пошуку користувачів:', error);
    res.status(500).json({ error: 'Помилка при пошуку користувачів' });
  }
};

module.exports = getDoctorsByProblem;
