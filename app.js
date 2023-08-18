const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const moment = require('moment');

const passport = require('passport');
const session = require('express-session');

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
// app.use(passport.initialize());
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: true,
//     secret: 'bla bla bla',
//   })
// );

// Used to serialize the user
// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// // Used to deserialize the user
// passport.deserializeUser(function (id, done) {
//   return done(null, id);
// });

// **********************************************************************

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
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
