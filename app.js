var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var flash = require('express-flash');
var i18n = require("i18n");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var validator = require('express-validator');

var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testMhavieRouter = require('./routes/test_mhavie');
var rapportRouter = require('./routes/rapport');
var rapportTableRouter = require('./routes/rapportTable');

var app = express();
global.prefix = (process.env.PREFIX) || "/";

i18n.configure({
    locales:['en', 'fr'],
    directory: __dirname + '/locales',
    defaultLocale: 'fr'
});

hbs.registerPartials(__dirname + '/views/layout');
hbs.localsAsTemplateData(app);

// helper to use the translation in the views
hbs.registerHelper('i18n', function() {
    return i18n.__.apply(this,arguments);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// use session
app.use(session({
    secret:']5=/JBGb41[>:&Ka]7}02qM?p$dY#^',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// ajout d'un middleware lorsqu'une vue est rendue: on sauve le rôle d'admin dans les valeurs locales
// ainsi que la valeur "authenticated" (utile pour la navbar)
app.use(function (req, res, next) {
    // récupération de la fonction de rendu de base
    var origRender = res.render;
    // création d'une nouvelle fonction de rendu et définition des valeurs locales selon l'état actuel de l'application
    res.render = function (view, locals, callback) {
        if ('function' == typeof locals) {
            callback = locals;
            locals = undefined;
        }
        if (!locals) {
            locals = {};
        }
        locals.req = req;
        // s'il y a une session et qu'un user s'y trouve, on détermine s'il est bien connecté et s'il est admin ou non
        if(req.session && req.session.user){
            res.locals.isAdmin = (req.session.user.role === "admin") ? true : false;
            res.locals.isAuthenticated = req.session.authenticated;
        }
        // sinon on définit que pas connecté ni admin
        else{
            res.locals.isAdmin = false;
            res.locals.isAuthenticated = false;
        }
        origRender.call(res, view, locals, callback);
    };
    req.next();
});

// flash messages
app.use(flash());

// internationalisation
app.use(i18n.init);

// validation
app.use(validator());

// Authenticated middleware
var isAuthenticated = (req, res, next) => {
    // If we have a session and authenticated is true, continue,
    // else redirect to the login page
    if (req.session && !req.session.authenticated) {
        req.flash('error', i18n.__('Veuillez vous connecter pour accéder à l\'application.'));
        res.redirect(global.prefix+'login');
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
            req.flash('error', i18n.__('Vous n\'êtes pas autorisés à accéder à cette page.'));
            res.redirect(global.prefix);
        }
    }else {
        res.redirect(global.prefix+'login');
    }
};

app.use('/login', loginRouter);
app.use('/logout', isAuthenticated, logoutRouter);
app.use('/', isAuthenticated, indexRouter);
app.use('/users', isAdmin, usersRouter);
app.use('/test', isAuthenticated, testMhavieRouter);
app.use('/rapport', isAuthenticated, rapportRouter);
app.use('/rapportTable', isAuthenticated, rapportTableRouter);

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
