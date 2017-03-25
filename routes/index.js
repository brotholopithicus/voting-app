const express = require('express');
const router = express.Router();

const Poll = require('../models/poll');

const auth = require('../mid/jwt');

/* GET home page. */
router.get('/', (req, res, next) => {
    Poll.find({}, (err, polls) => {
        if (err) return next(err);
        res.render('index', { polls });
    });
});

/* GET create poll */
router.get('/create', auth(), (req, res, next) => {
    res.render('poll/create');
});

/* GET login page */
router.get('/login', (req, res, next) => {
    res.render('login');
});

/* GET profile page */
router.get('/profile', auth(), (req, res, next) => {
    res.render('profile');
});

module.exports = router;
