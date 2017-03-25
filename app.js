const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const index = require('./routes/index');
const users = require('./routes/users');
const polls = require('./routes/polls');

const app = express();

require('dotenv').config();

// db setup
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, `Connection to ${process.env.MONGODB_URI} failed`));
db.once('open', () => console.log(`Connected to ${process.env.MONGODB_URI}`));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const jwt = require('jsonwebtoken');

app.use((req, res, next) => {
    if (!req.cookies.token) return next();
    jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
        if (err) return next(err);
        if (!decoded) return next();
        res.locals.user = decoded;
        next();
    });
});

app.use('/', index);
app.use('/users', users);
app.use('/polls', polls);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
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
