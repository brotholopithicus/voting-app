const express = require('express');
const router = express.Router();

const Poll = require('../models/poll');

/* GET all polls */
router.get('/', (req, res, next) => {
    Poll.find({}, (err, polls) => {
        if (err) return next(err);
        res.json(polls);
    });
});

/* POST new poll */
router.post('/new', (req, res, next) => {
    const poll = new Poll({ text: req.body.text, options: req.body.options });
    poll.save((err) => {
        if (err) return next(err);
        return res.json(poll);
    });
});

/* GET poll by id */
router.get('/:id', (req, res, next) => {
    Poll.findById(req.params.id, (err, poll) => {
        if (err) return next(err);
        if (poll.voted.includes(req.connection.remoteAddress)) return res.render('poll/postvote', { poll });
        return res.render('poll/prevote', { poll });
    });
});

/* POST poll vote page */
router.post('/:id', (req, res, next) => {
    Poll.findById(req.params.id, (err, poll) => {
        if (err) return next(err);
        // if user at this ip address has already voted on poll, redirect
        if (poll.voted.includes(req.connection.remoteAddress)) return res.redirect('/polls/' + poll._id);
        // otherwise submit their vote and save
        poll.options.find(option => option.text === req.body.option).votes++;
        poll.voted.push(req.connection.remoteAddress);
        poll.save((err) => {
            if (err) return next(err);
            res.redirect('/polls/' + poll._id);
        });
    });
});

module.exports = router;
