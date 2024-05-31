const jwt = require('json webtoken')

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

