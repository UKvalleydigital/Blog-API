const jwt = require('jsonwebtoken')

exports.verify = function(token, req, res) {
    jwt.verify(token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.json({
                authData
            });
        }
    });
};

exports.authorize = function(req, res, next) {
    const bearer = req.headers['authorization'];
    if (typeof bearer !== 'undefined') {
        const bearerArray = bearer.split(' ');
        const token = bearerArray[1]
        req.token = token;
        next();
    } else {
        return res.json({ msg: 'not authorised' });
    }
};