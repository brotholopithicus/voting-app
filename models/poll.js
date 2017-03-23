const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    text: String,
    options: [{ text: String, votes: { type: Number, default: 0 } }],
    voted: [String]
});

const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;
