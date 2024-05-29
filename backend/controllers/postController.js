const Post = require('../models/post');
const asyncHandler  = require('express-async-handler');

exports.post_list = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: Post list');
});

exports.post_create_get = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: Create post GET');
});

exports.post_create_post = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: Create post POST');
});

exports.postId_update = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: UPDATE post');
});

exports.postId_delete = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: DELETE post');
});

exports.postId_get = asyncHandler(async (req, res, next) => {
    res.json('NOT IMPLEMENTED: Get specific post');
});