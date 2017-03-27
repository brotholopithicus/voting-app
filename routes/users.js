const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const verify = require('../mid/verify');

const User = require('../models/user');

/* GET users listing. */
router.get('/', (req, res, next) => {
    if (!req.cookies.token) return next(new Error('u r n0t authoriZed 2 view dis page'));
    verify(req.cookies.token, (err, result) => {
        if (err) return next(err);
        User.find({}, (err, users) => {
            if (err) return next(err);
            res.json(users);
        });
    });
});

/* GET logout user */
router.get('/logout', (req, res, next) => {
    res.locals.isLoggedIn = false;
    res.clearCookie('token');
    res.redirect('/');
});

/* POST create new user */
router.post('/', (req, res, next) => {
    const user = new User({ name: req.body.name, username: req.body.username, password: req.body.password, email: req.body.email });
    user.save((err) => {
        if (err) return next(err);
        res.json(user);
    });
});

/* POST login user */
router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return next(err);
        if (!user) return next(new Error('Username Not Found'));
        user.comparePassword(req.body.password, (err, result) => {
            if (err) return next(err);
            if (result) {
                const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' });
                res.cookie('token', token);
                res.locals.isLoggedIn = true;
                res.set('Authorization', token);
                res.redirect('/profile');
            } else {
                res.json({ error: true, message: 'password does not match' });
            }
        });
    });
});

/* POST create new user */
router.post('/new', (req, res, next) => {
    const user = new User({ name: req.body.name, username: req.body.username, email: req.body.email, password: req.body.password });
    user.save((err) => {
        if (err) return next(err);
        const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' });
        res.cookie('token', token);
        res.redirect('/');
    });
});

module.exports = router;
