const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const validationResult = require('express-validator');

exports.post_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({})
        .sort({ date_posted: 1 })
        .populate('user')
        .populate('comment')
        .exec()

    res.json(allPosts);
});

exports.post_create_post = asyncHandler(async (req, res, next) =>{
    if (!Array.isArray(req.body.comments)) {
        req.body.comments = typeof req.body.comments === 'undefined'
        ? [] : [req.body.comments];
    }

    const errors = validationResult(req);
    if (!errors.empty()) {
        res.json(errors.array());
    }

    const createdPost = new Post({
        user: req.body.user,
        comments: typeof req.body.comments === 'undefined'
        ? [] : req.body.comments,
        title: req.body.title,
        published: req.body.published,
        text: req.body.text,
        date_posted: Date.now() 
    });
    
    createdPost.save();
    res.json(createdPost);
});


exports.postId_update = asyncHandler(async (req, res, next) => {
    if (!Array.isArray(req.body.comments)) {
        req.body.comments = typeof req.body.comments === 'undefined'
        ? [] : [req.body.comments];
    }

    const errors = validationResult(req);
    if (!errors.empty()) {
        res.json(errors.array());
    }

    const updatedPost = Post.findByIdAndUpdate(req.params.id);
    
    updatedPost.save();
    res.json(updatedPost);
});

exports.postId_delete = asyncHandler(async (req, res, next) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    res.json(deletedPost);
});

exports.postId_get = asyncHandler(async (req, res, next) => {
    const post = Post.findById(req.params.id)
        .populate('user')
        .populate('comment')
        .exec()

    res.json(post);
});