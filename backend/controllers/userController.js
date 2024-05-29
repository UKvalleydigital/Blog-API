const User = require('../models/user');
const asyncHandler = require('express-async-handler');

exports.user_login = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: Login');
});

exports.user_register = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: Register');
});
