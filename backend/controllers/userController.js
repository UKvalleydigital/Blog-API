const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
require('dotenv').config;

exports.user_profile_info = asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user.user) {
        res
            .status(404)
            .json({ error: true, msg: 'User not found' });
    } else {
        res.json({ 
            error: false,
            email: user.user.email,
            msg: 'Profile created'
        });
    } 
});
 
exports.user_post_list = asyncHandler(async (req, res, next) => {
    const user = req.user;

    if (!user.user) {
        res
        .status(404)
        .json({ error: true, msg: 'User not found' });
    }
    
    const allPostsByUser = await Post.find({ user: user.user.id })
    
    if (!user.user.blogger) {
        res.json({
            error: false,
            posts: [],
            msg: 'No posts given'
        })
    } else {
        res.json({ 
            error: false,
            posts: allPostsByUser,
            msg: 'Posts given'
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

    const user = await User.findOne({ email: email });
    if (!user) {
        return res
            .status(404)
            .json({ error: true, msg: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (user.email !== email || !match) {
        return res
            .status(404)
            .json({ error: true, msg: 'Invalid email or password' });
    }
    const token = jwt.sign({ user }, process.env.SECRET, {
        expiresIn: '3m'
    });

    if (user) {
        return res.json({
            error: false,
            user,
            token,
            msg: 'Successful login'
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
        expiresIn: '3m'
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
