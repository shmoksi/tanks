var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// remove after MongoStore is removed from app.js
var mongoose = require('mongoose');

var users = require('./api/users/usersRoutes');
var check = require('./middleware/check');

var connectMongo = require('connect-mongo');
var MongoStore = connectMongo(session);

var app = express();

var cons = require('consolidate');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'come_in',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 45 * 60 * 1000 },
    saveUninitialized: false,
    resave: true,
    rolling: true
}));

app.use('/api/users', users);
app.use('/game', check);
//app.use('/chat',chat)
//=======
app.use('/public', express.static(path.join(__dirname, '..', '..', 'public')));
app.use('/*', express.static(path.join(__dirname, '..', '..', 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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
