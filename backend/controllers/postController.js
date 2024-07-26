const Post = require('../models/post');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

exports.post_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({ published: true }).exec();

    if (!allPosts) {
        res
            .status(403)
            .json({ error: true, msg: 'Posts unavailable' });
    } 
    
    res.json({ error: false, allPosts });
});

exports.post_create = asyncHandler(async (req, res, next) =>{
    const { comments, published, title, text } = req.body;
    
    if (!Array.isArray(comments)) {
        comments = typeof comments === 'undefined'
        ? [] : [comments];
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

    const post = await Post.findOne({ title: title, text: text });
    if (post) {
        return res
            .status(404)
            .json({ error: true, msg: 'This specific post has already been made' })
    }

    
    const user = req.user;
    const createdPost = new Post({
        user: req.user.user,
        comments: typeof comments === 'undefined'
        ? [] : comments,
        title,
        published: published,
        text,
        date_posted: Date.now() 
    });
    
    createdPost.save();
    
    const updatedUser = await User.findByIdAndUpdate(user.user._id,
        { $push: { posts: createdPost } }, {});

    if (createdPost && updatedUser) {
        res.json({ error: false, createdPost });
    }
});

exports.post_update = asyncHandler(async (req, res, next) => {
    const comments = req.body.comments;
    
    if (!Array.isArray(comments)) {
        comments = typeof comments === 'undefined'
        ? [] : [comments];
    }

    const post = await Post.findById(req.params.id);
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

exports.post_delete = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res
            .status(404)
            .json({ error: true, msg: 'Post not found' });
    }
    
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    res.json({ error: false, deletedPost });
});

exports.postId_get = asyncHandler(async (req, res, next) => {
    const { title, text } = req.body;
    const post = await Post.findOne({ 
        title: title, 
        published: true, 
        text: text
    }).exec();

    if (!post) {
        return res
            .status(404)
            .json({ error: true, msg: 'Post not found' });
    }

    res.json({ error: false, id: post._id });
});

exports.post_get = asyncHandler(async (req, res, next) => {
    const id = req.body.postID;
    const post = await Post.findById(id).exec();

    if (!post) {
        return res
            .status(403)
            .json({ error: true, msg: 'Post not found' })
    }

    res.json({ error: false, msg: 'Post found!', post })
})
