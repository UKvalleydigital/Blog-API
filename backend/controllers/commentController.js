const Comment = require('../models/comment');
const verify = require('../config/passport');
const asyncHandler = require('express-async-handler');

exports.comment_list = asyncHandler(async (req, res, next) => {
    const allComments = await Comment.find({})
        .sort({ date_posted: 1 })
        .populate('user')
        .exec()

    if (!allComments) {
        return res
            .status(404)
            .json({ error: true, msg: 'Comments unavailable' })
    }

    res.json({ error: false, allComments });
});

exports.comment_create_post = asyncHandler(async (req, res, next) => {
    const { user, text, date_posted } = req.body;
    if (!text) {
        return res
            .status(404)
            .json({ error: true, msg: 'Text required' });
    }

    const createdComment = new Comment({
        user,
        text,
        date_posted
    });

    createdComment.save();
    verify(req.token, createdComment);
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