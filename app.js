<<<<<<< HEAD

=======
>>>>>>> added authentication, persists to req.session.passport.user
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var exphbs  = require('express-handlebars');

var routes = require('./server/routes/index');
var users = require('./server/routes/user');
var api = require('./server/routes/api');

var passport = require('passport');
var UberStrategy = require('passport-oauth').OAuth2Strategy;

var app = express();

// view engine setup

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: ['views/partials/']
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || require('./private').sessionSecret,
  resave: false,
  saveUninitialized: false
}));

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);

// passport-oauth implementation
app.use(passport.initialize());
app.use(passport.session());

passport.use('uber', new UberStrategy({
    authorizationURL: 'https://login.uber.com/oauth/authorize',
    tokenURL: 'https://login.uber.com/oauth/token',
    clientID: process.env.UBER_ID || require('./private').clientID,
    clientSecret: process.env.UBER_SECRET || require('./private').clientSecret,
    callbackURL: 'http://localhost:3000/auth/uber/callback'
  },
  function(accessToken, refreshToken, profile, done){
    // for debugging
    // console.log('accessToken: ' + accessToken + '\nrefreshToken: ' + refreshToken + '\nprofile: ' + profile);
    done(null, accessToken);
  }
));

passport.serializeUser(function(token, done) {
  done(null, token);
});

passport.deserializeUser(function(token, done) {
  done(null, token);
});

app.get('/auth/uber',
  passport.authenticate('uber',{scope:'request'})
);

app.get('/auth/uber/callback',
  passport.authenticate('uber', { successRedirect: '/success', failureRedirect: '/failure' })
);

app.get('/success', function(req, res){
  // console.log(req);
  console.log('auth is: ' + req.session.passport.user);
  res.send('yay');
})

// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
