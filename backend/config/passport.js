const jwt = require('jsonwebtoken')

exports.verify = function(req, res, next) {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            return res
                .sendStatus(404)
                .json({ msg: 'Verify token failed', token })
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
        next();
    } else {
        return res
            .status(403)
            .json({ msg: 'not authorised' });
    }
};