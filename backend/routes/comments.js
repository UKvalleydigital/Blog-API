const express = require('express');
const passportJWT = require('../config/passport');
const router = express.Router();
const comment_controller = require('../controllers/commentController');

router.get('/posts/:postId/comments', comment_controller.comment_list);

router.post('/comment_form',passportJWT.authorize, comment_controller.comment_create_post);

router.put('/comments/:commentId',passportJWT.authorize, comment_controller.commentId_update);

router.delete('/posts/:postId/comments/:commentId', passportJWT.authorize, comment_controller.commentId_delete);

module.exports = router;