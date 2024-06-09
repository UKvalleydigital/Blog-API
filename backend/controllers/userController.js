const User = require('../models/user');
const sign = require('../config/passport').sign;
const asyncHandler = require('express-async-handler');

exports.user_login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
        
    if (!email) {
        return res
            .status(400)
            .json({ error: true, msg: 'Email required' });
    } 
    
    if (!password) {
        return res
            .status(400)
            .json({ error: true, msg: 'Password required' });
    } 

    const userDetail = await User.findOne({ email: email });
    if (!userDetail) {
        return res
            .status(400)
            .json({ error: true, msg: 'User not found' });
    }

    if (userDetail.email === email || userDetail.password === email) {
        return res
            .status(400)
            .json({ error: true, msg: 'Inalid email or password' });
    } else {
        const user = { user: userDetail };
        const token = sign(user);

        return res.json({
            error: false,
            email,
            token,
            msg: 'Success login'
        });
    }
});

exports.user_register = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email) {
        return res
            .status(400)
            .json({ error: true, msg: 'Email required' });
    } 
    
    if (!password) {
        return res
            .status(400)
            .json({ error: true, msg: 'Password required' });
    } 

    const takenUser = await User.findOne({ email: email });
    if (takenUser) {
        return res
            .status(400)
            .json({ error: true, msg: 'Email already in use' });
    }
    
    const user = new User({
        email,
        username,
        password
    });

    await user.save();
    const token = sign(user);
    return res.json({
        error: false,
        user,
        token,
        msg: 'Success register'
    });
});
