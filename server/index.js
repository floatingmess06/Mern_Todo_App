var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/api');
var passport=require('passport');
//session setup
const session = require('express-session');
const {connectDb,connection} = require('./config/db');
const MongoStore = require('connect-mongo');

var app = express();
require('dotenv').config();
const port = process.env.PORT;

// connect Db
connectDb();

//session setup2
const sessionStore = MongoStore.create({
  mongoUrl: process.env.DB_CONNECTION_STRING, // replace with your MongoDB connection string
  collectionName: 'sessionMytodo'
});
app.use(session({
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  store:sessionStore,
  cookie:{
    maxAge:1000*60*60*24
  }
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//cors setting
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error hand');
});

// server starts listening
app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
});

module.exports = app;
