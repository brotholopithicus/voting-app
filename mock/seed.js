require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.once('open', () => console.log('connected to db'));

const Poll = require('../models/poll');

const someNewPolls = [{
        text: 'What is your favorite color?',
        options: [{ text: 'blue' }, { text: 'red' }, { text: 'green' }, { text: 'yellow' }]
    },
    {
        text: 'What is your favorite food?',
        options: [{ text: 'pizza' }, { text: 'fish' }, { text: 'frog legs' }, { text: 'dirt' }]
    },
    {
        text: 'What is your favorite time of day?',
        options: [{ text: 'morning' }, { text: 'afternoon' }, { text: 'evening' }, { text: 'midnight' }]
    },
    {
        text: 'What is your favorite variable naming strategy?',
        options: [{ text: 'things on your desk' }, { text: 'relevant and descriptive' }, { text: 'pig latin' }, { text: 'saltwater fish' }]
    },
    {
        text: 'What color is the sky?',
        options: [{ text: 'blue' }, { text: 'black' }, { text: 'what sky?' }, { text: 'neon green' }]
    }
]
someNewPolls.forEach(newPoll => {
    const poll = new Poll(newPoll);
    poll.save((err) => {
        if (err) handleError(err);
        console.log('saved');
    });
});

function handleError(err) {
    console.log(err);
}
