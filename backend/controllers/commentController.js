const validationResult = require('express-validator');
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');

exports.comment_list = asyncHandler(async (req, res, next) => {
    const allComments = await Comment.find({})
        .sort({ date_posted: 1 })
        .populate('user')
        .exec()

    res.json(allComments);
});

exports.comment_create_post = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.empty()) {
        res.json(errors.array());
    }

    const createdComment = new Comment({
        user: req.body.user,
        text: req.body.text,
        date_posted: Date.now()
    });

    createdComment.save();
    res.json(createdComment);
})

exports.commentId_update = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.empty()) {
        res.json(errors.array());
    }

    const updatedComment = await Comment.findByIdAndUpdate(req.params.id);
    
    updatedComment.save();
    res.json(updatedComment);
});

exports.commentId_delete = asyncHandler(async (req, res, next) => {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    res.json(deletedComment);
});