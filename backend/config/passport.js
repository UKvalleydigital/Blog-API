const jwt = require('jsonwebtoken')

exports.verify = function(token, result) {
    jwt.verify(token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                authData,
                result
            });
        }
    });
};

exports.sign = function(payload) {
    jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' }, (err, token) => {
        res.json({token});
    });
};

exports.verify_token = function(req, res, next) {
    const bearer = req.headers['authorization'];
    if (typeof bearer !== 'undefined') {
        const bearerArray = bearer.split(' ');
        const token = bearerArray[1]
        req.token = token;
        next();
    } else {
        res.json({msg: 'not authorised'});
    }
};