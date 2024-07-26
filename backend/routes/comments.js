const express = require('express');
const passport = require('../config/passport');
const router = express.Router();
const comment_controller = require('../controllers/commentController');

router.post('/comment_form',passport.authorize, passport.verify, comment_controller.comment_create_post);

router.post('/comments_post', comment_controller.comments_post);

router.put('/comments_update',passport.authorize, passport.verify, comment_controller.commentId_update);

router.delete('/comment_delete', passport.authorize, passport.verify, comment_controller.commentId_delete);

module.exports = router;