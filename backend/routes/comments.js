const express = require('express');
const passportJWT = require('../config/passport');
const router = express.Router();
const comment_controller = require('../controllers/commentController');

router.post('/comment_form',passportJWT.authorize, comment_controller.comment_create_post);

router.put('/comments_update',passportJWT.authorize, comment_controller.commentId_update);

router.delete('/comment_delete', passportJWT.authorize, comment_controller.commentId_delete);

module.exports = router;