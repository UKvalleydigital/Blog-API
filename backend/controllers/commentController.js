const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');

exports.comment_list = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: Comment list');
});

exports.comment_create_get = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: Create comment GET');
});

exports.comment_create_post = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: Create comment POST');
});

exports.commentId_update = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: UPDATE comment');
});

exports.commentId_delete = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: DELETE comment');
});