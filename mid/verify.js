const jwt = require('jsonwebtoken');
module.exports = function verifyJWT(token, cb) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return cb(err);
        if (!decoded) return cb(new Error('invalid json web token'));
        cb(null, decoded);
    });
}
