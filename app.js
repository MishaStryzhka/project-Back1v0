const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const moment = require('moment');
require('dotenv').config();

const fs = require('fs/promises');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const authRouter = require('./routes/api/auth');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format('DD-MM-YYYY_hh:mm:ss');
  await fs.appendFile('./public/logs/server.log', `\n${method} ${url} ${date}`);

  next();
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// **********************************************************************
const passport = require('passport');
const session = require('express-session');
const facebookStrategy = require('passport-facebook');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.use(passport.initialize());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla',
  })
);

// -> Make facebook strategy
passport.use(
  new facebookStrategy(
    {
      // pull in our app id and secret from our auth.js file
      clientID: '213055368085109',
      clientSecret: '1fdd4a07ad10cd42b0704e420cf4bc11',
      callbackURL: 'http://localhost:4000/facebook/callback',
      profileFields: ['id', 'displayName', 'name', 'emails', 'photos'],
    }, // facebook will send back the token and profile
    function (token, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);

app.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);

app.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/failed',
  })
);

app.get('/profile', (req, res) => {
  res.send('You are a valid user');
});

app.get('/failed', (req, res) => {
  res.send('You are a non valid user');
});

// Used to serialize the user
passport.serializeUser(function (user, done) {
  done(null, user);
});

// Used to deserialize the user
passport.deserializeUser(function (id, done) {
  return done(null, id);
});

// **********************************************************************

app.use('/api/users', authRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
