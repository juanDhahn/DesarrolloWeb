const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const statsRouter = require('./routes/stats');
const summonerRouter = require('./routes/summoner');
const userRouter = require('./routes/user');
const itemsRouter = require('./routes/items');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/stats', statsRouter);
app.use('/summoner', summonerRouter);
app.use('/user', userRouter);
app.use('/items', itemsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//{
//     "profileIconId": 3379,
//     "name": "Orick",
//     "summonerLevel": 68,
//     "accountId": 118550,
//     "id": 113649,
//     "revisionDate": 1522848678000
// }
