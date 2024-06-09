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
            .status(404)
            .json({ error: true, msg: 'Posts unavailable' });
    }

    res.json({error: false, allPosts });
});

exports.post_create_post = asyncHandler(async (req, res, next) =>{
    const { comments, title, text } = req.body;
    
    if (!Array.isArray(comments)) {
        comments = typeof comments === 'undefined'
        ? [] : [comments];
    }
    
    if (!title) {
        return res
            .status(404)
            .json({ error: true, msg: 'Title required' });
    }

    if (!text) {
        return res
            .status(404)
            .json({ error: true, msg: 'Content required' });
    }
    
    const createdPost = new Post({
        user,
        comments: typeof comments === 'undefined'
        ? [] : comments,
        title,
        published: req.body.published,
        text,
        date_posted: Date.now() 
    });
    
    createdPost.save();
    verify(req.token, createdPost);
    return res.json({ error: false, createdPost });
});


exports.postId_update = asyncHandler(async (req, res, next) => {
    const comments = req.body.comments;
    
    if (!Array.isArray(comments)) {
        comments = typeof comments === 'undefined'
        ? [] : [comments];
    }

    const post = Post.findOne(req.params.id);
    if (!post) {
        return res
        .status(404)
        .json({ error: true, msg: 'Post not found' });
    }

    const updatedPost = Post.findByIdAndUpdate(req.params.id);
    
    if (published) updatedPost.published = true;

    updatedPost.save();
    verify(req.token, updatedPost);
    res.json({ error: false, updatedPost });
});

exports.postId_delete = asyncHandler(async (req, res, next) => {
    const post = Post.findOne(req.params.id);
    if (!post) {
        return res
            .status(404)
            .json({ error: true, msg: 'Post not found' });
    }
    
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    res.json({ error: false, deletedPost });
});

exports.postId_get = asyncHandler(async (req, res, next) => {
    const post = Post.findById(req.params.id)
    .populate('user')
    .populate('comment')
    .exec()

    if (!post) {
        return res
            .status(404)
            .json({ error: true, msg: 'Post not found' });
    }

    res.json({ error: false, post });
});