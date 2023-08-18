const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const { User } = require('../models/index');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

// ********** Google Authenticate ****************** //
const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/users/google/callback`,

  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, name, provider, picture } = profile;
    console.log(profile.profider);
    const user = await User.findOne({ email });

    if (user) {
      return done(null, user); // req.user = user
    }

    const password = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({
      email,
      password,
      firstName: name.givenName,
      lastName: name.familyName,
      provider,
      avatar: picture,
    });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);

// ********** Facebook Authenticate ****************** //
const facebookStrategy = require('passport-facebook');

const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env;

const facebookParams = {
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000/api/users/facebook/callback',
  profileFields: ['id', 'displayName', 'name', 'emails', 'photos'],
};

const facebookCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  // return done(null, profile);
  try {
    const { emails, name, provider } = profile;
    const email = emails[0].value;
    const avatar = profile.photos[0].value;
    const user = await User.findOne({ email });

    if (user) {
      return done(null, user); // req.user = user
    }

    const password = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({
      email,
      password,
      firstName: name.givenName,
      lastName: name.familyName,
      patronymic: name.middleName,
      provider,
      avatar,
    });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const facebookStr = new facebookStrategy(facebookParams, facebookCallback);

passport.use('facebook', facebookStr);
// ******************************************

module.exports = passport;
