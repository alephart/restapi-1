var express     = require('express');
var path        = require('path');
var favicon     = require('static-favicon');
var logger      = require('morgan');
var cookieParser= require('cookie-parser');
var session     = require('express-session')
var bodyParser  = require('body-parser');

var db = require('./model/db');

var home = require('./routes/index');
var user = require('./routes/user');
var login = require('./routes/login');
var logout = require('./routes/logout');
var project = require('./routes/project');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: '4FA5369B-5B48-4F16-882D-72A39572C0E7'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/user', user);
app.use('/login', login);
app.use('/logout', logout);
app.use('/project', project);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;