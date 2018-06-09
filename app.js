var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var flash = require('express-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var hbs = require('hbs');

var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testMhavieRouter = require('./routes/test_mhavie');
var rapportRouter = require('./routes/rapport');

var app = express();
global.prefix = (process.env.PREFIX) || "/";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

// use session
app.use(session({
    secret:']5=/JBGb41[>:&Ka]7}02qM?p$dY#^',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(flash());

// Authenticated middleware
var isAuthenticated = (req, res, next) => {
    // If we have a session and authenticated is true, continue,
    // else redirect to the login page
    if (req.session && !req.session.authenticated) {
        req.flash('error', 'Please login to access the application');
        res.redirect('/login');
    }
    req.next();
};

// Admin middleware
var isAdmin = (req, res, next) => {
    // If we have a session and authenticated is true,
    //      if user is admin, continue,
    //      else redirecto to index
    // else redirect to the login page
    if (req.session && req.session.authenticated === true) {
        if (req.session.user.role === "admin") {
            next();
        }else {
            req.flash('error', 'You\'re not allowed to access this page');
            res.redirect('/');
        }
    }else {
        res.redirect('/login');
    }
};

app.use('/login', loginRouter);
app.use('/logout', isAuthenticated, logoutRouter);
app.use('/', isAuthenticated, indexRouter);
app.use('/users', isAdmin, usersRouter);
app.use('/test', isAuthenticated, testMhavieRouter);
app.use('/rapport', isAuthenticated, rapportRouter);

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
  res.render('error');
});

module.exports = app;
