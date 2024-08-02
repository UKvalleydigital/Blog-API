const jwt = require('jsonwebtoken');

exports.verify = function(req, res, next) {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res
                .status(403)
                .json({ msg: 'Verify token failed', error: true, err })
        } else {
            req.user = authData;
            next();
        }
    });
};

exports.authorize = function(req, res, next) {
    const bearer = req.headers.authorization;
    if (bearer) {
        const bearerArray = bearer.split(' ');
        const token = bearerArray[1];
        req.token = token;
        next()
    } else {
        res
            .status(403)
            .json({ msg: 'Not authorised', error: true });
    }
};