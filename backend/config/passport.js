const jwt = require('jsonwebtoken')

exports.verify = function(token) {
    jwt.verify(token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(404);
        } else {
            return res.json({
                authData
            });
        }
    });
};

exports.sign = function(payload) {
    jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' }, (err, token) => {
        return res.json({token});
    });
};

exports.authorize = function(req, res, next) {
    const bearer = req.headers['authorization'];
    if (typeof bearer !== 'undefined') {
        const bearerArray = bearer.split(' ');
        const token = bearerArray[1]
        req.token = token;
        verify(token);
        next();
    } else {
        return res.json({msg: 'not authorised'});
    }
};