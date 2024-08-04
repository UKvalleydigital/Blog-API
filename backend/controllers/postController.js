const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');

exports.post_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({ published: true }).exec();

    if (!allPosts) {
        res
            .status(404)
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
    const { postID, title, published, text } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(postID, {
        title,
        published,
        text
    });

    if (!updatedPost) {
        res
            .status(404)
            .json({ error: true, msg: 'Post not found' })
    }

    res.json({ error: false, updatedPost });
});

exports.post_delete = asyncHandler(async (req, res, next) => {
    const postID = req.body.postID;
    const postComments = await Comment.find({ post: postID }).exec();
    postComments.forEach(async (comment) => {
        await Comment.findByIdAndDelete(comment._id);
    })

    const deletedPost = await Post.findByIdAndDelete(postID);

    if (!deletedPost) {
        res 
            .status(404)
            .json({ error: true, msg: 'Post not found' })
    }

    res.json({ error: false, deletedPost });
});

exports.postId_get = asyncHandler(async (req, res, next) => {
    const { title, text } = req.body;
    const post = await Post.findOne({ 
        title: title,  
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
            .status(404)
            .json({ error: true, msg: 'Post not found' })
    }

    res.json({ error: false, msg: 'Post found!', post })
})
