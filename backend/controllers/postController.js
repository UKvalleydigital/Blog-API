const Post = require('../models/post');
const verify = require('../config/passport').verify;
const asyncHandler = require('express-async-handler');

exports.post_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({})
        .sort({ date_posted: 1 })
        .populate('user')
        .populate('comment')
        .exec()

    if (!allPosts) {
        return res
            .status(400)
            .json({ error: true, msg: 'Posts unavailable' });
    }

    res.json({error: false, allPosts });
});

exports.post_create_post = asyncHandler(async (req, res, next) =>{
    if (!Array.isArray(req.body.comments)) {
        req.body.comments = typeof req.body.comments === 'undefined'
        ? [] : [req.body.comments];
    }
    
    if (!title) {
        return res
            .status(400)
            .json({ error: true, msg: 'Title required' });
    }

    if (!text) {
        return res
            .status(400)
            .json({ error: true, msg: 'Content required' });
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
    verify(req.token, createdPost);
    return res.json({ error: false, createdPost });
});


exports.postId_update = asyncHandler(async (req, res, next) => {
    if (!Array.isArray(req.body.comments)) {
        req.body.comments = typeof req.body.comments === 'undefined'
        ? [] : [req.body.comments];
    }
    
    if (!title) {
        return res
            .status(400)
            .json({ error: true, msg: 'Title required' });
    }

    if (!text) {
        return res
            .status(400)
            .json({ error: true, msg: 'Content required' });
    }

    
    const updatedPost = Post.findByIdAndUpdate(req.params.id);
    if (!updatedPost) {
        return res
        .status(400)
        .json({ error: true, msg: 'Post not found' });
    }
    
    if (published) updatedPost.published = true;

    updatedPost.save();
    verify(req.token, updatedPost);
    res.json({ error: false, updatedPost });
});

exports.postId_delete = asyncHandler(async (req, res, next) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
        return res
            .status(400)
            .json({ error: true, msg: 'Post not found' });
    }

    res.json({ error: false, deletedPost });
});

exports.postId_get = asyncHandler(async (req, res, next) => {
    const post = Post.findById(req.params.id)
    .populate('user')
    .populate('comment')
    .exec()

    if (!post) {
        return res
            .status(400)
            .json({ error: true, msg: 'Post not found' });
    }

    res.json({ error: false, post });
});