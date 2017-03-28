const jwt = require('jsonwebtoken');
module.exports = () => (req, res, next) => {
    if (!req.cookies.token) return next(new Error('yall aint authorimisized to view this page here'));
    jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (err.message === 'jwt expired') return res.redirect('/users/logout');
            return next(err);
        }
        if (!decoded) return next('Invalid JSON web token');
        res.locals.user = decoded._doc;
        next();
    });
}
