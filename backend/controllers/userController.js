const User = require('../models/user');
const Post = require('../models/post');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
require('dotenv').config;

exports.user_profile_info = asyncHandler(async (req, res, next) => {
    const user = passport.verify(req.token, req, res);
    JSON.parse(user);

    if (!user) {
        res
        .status(404)
        .json({ error: true, msg: 'User not found' });
    } else {
        res.json({ 
            error: false,
            email: user.email,
            msg: 'Profile created'
        });
    } 
});
 
exports.user_post_list = asyncHandler(async (req, res, next) => {
    const user = passport.verify(req.token, req, res);
    JSON.parse(user);

    if(user.blogger = true) {
        res.json({
            error: false,
            posts: [],
            msg: 'Success'
        })
    }

    const allPostsByUser = await Post.find({ user: user.id })
    
    if (!user) {
        res
        .status(404)
        .json({ error: true, msg: 'User not found' });
    } else {
        res.json({ 
            error: false,
            posts: allPostsByUser,
            msg: 'Success'
        });
    }  
});

exports.user_login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
        
    if (!email) {
        return res
            .status(404)
            .json({ error: true, msg: 'Email required' });
    } 
    
    if (!password) {
        return res
            .status(404)
            .json({ error: true, msg: 'Password required' });
    } 

    const userDetail = await User.findOne({ email: email });
    if (!userDetail) {
        return res
            .status(404)
            .json({ error: true, msg: 'User not found' });
    }

    if (userDetail.email === email || userDetail.password === email) {
        return res
            .status(404)
            .json({ error: true, msg: 'Inalid email or password' });
    } else {
        const user = { user: userDetail };
        const token = sign(user, req, res);

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
            .json({ error: true, msg: 'User already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        email,
        password: hashedPassword
    });
    
    await user.save();
    const token = jwt.sign({ user }, process.env.SECRET, {
        expiresIn: '3d'
    });

    if (user) {
        return res.json({
            error: false,
            user,
            token,
            msg: 'Successful register'
        });
    }
});
