const User = require('../models/user');
const sign = require('../config/passport').sign;
const asyncHandler = require('express-async-handler');

exports.user_login = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: Login');
    sign(loginUser);
});

exports.user_register = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: Register');
});
