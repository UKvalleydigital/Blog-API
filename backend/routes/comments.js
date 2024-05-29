const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/commentController');

router.get('/posts/:postId/comments', comment_controller.comment_list);

router.get('/comment_form', comment_controller.comment_create_get);

router.post('/comment_form', comment_controller.comment_create_post);

router.put('/comments/:commentId', comment_controller.commentId_update);

router.delete('/comments/:commentId', comment_controller.commentId_delete);

module.exports = router;