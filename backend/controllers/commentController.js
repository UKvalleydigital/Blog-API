const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const verify = require('../config/passport');
const asyncHandler = require('express-async-handler');

exports.comment_create_post = asyncHandler(async (req, res, next) => {
    const { post, text } = req.body;
    const user = req.user;

    if (!text) {
        return res
            .status(404)
            .json({ error: true, msg: 'Text required' });
    }

    const createdComment = new Comment({
        user: user.user,
        post,
        text,
        date_posted: Date.now()
    });

    createdComment.save();
    Post.findByIdAndUpdate(post._id, { $push: { comments: createdComment } });
    User.findByIdAndUpdate(user.user._id, { $push: { comments: createdComment } });

    res.json({ error: false, createdComment });
});

exports.commentId_update = asyncHandler(async (req, res, next) => {
    const comment = Comment.findOne(req.params.id);
    if (!comment) {
        return res
            .status(404)
            .json({ error: true, msg:'Comment not found' })
    }
    
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id);

    updatedComment.save();
    verify(req.token, updatedComment);
    res.json({ error: false, updatedComment });
});

exports.commentId_delete = asyncHandler(async (req, res, next) => {
    const comment = Comment.findOne(req.params.id);
    if (!comment) {
        return res
            .status(404)
            .json({ error: true, msg:'Comment not found' })
    }

    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    verify(req.token, deletedComment);
    res.json({ error: false, deletedComment });
});

exports.comments_post = asyncHandler(async (req, res, next) => {
    const postID = req.body.postID;

    const postComments = await Comment.find({ post: postID }).exec();
    if (!postComments) {
        return res
            .status(404)
            .json({ error: true, msg:'Comment not found' })
    }

    res.json({ error: false, postComments });
})