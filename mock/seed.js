require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.once('open', () => console.log('connected to db'));

const createUser = require('./users');
const createNewPolls = require('./polls');

createNewPolls();
// createUser();

function handleError(err) {
    console.log(err);
}
