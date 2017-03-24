const express = require('express');
const router = express.Router();

const Poll = require('../models/poll');

/* GET home page. */
router.get('/', (req, res, next) => {
    Poll.find({}, (err, polls) => {
        if (err) return next(err);
        res.render('index', { polls });
    });
});

/* GET create poll */
router.get('/createPoll', (req, res, next) => {
    res.render('poll/create');
});

module.exports = router;
