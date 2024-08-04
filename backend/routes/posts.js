const express = require('express');
const passport = require('../config/passport');
const router = express.Router();
const post_controller = require('../controllers/postController');

router.get('/posts', post_controller.post_list);

router.post('/postID', post_controller.postId_get);

router.post('/post_get', post_controller.post_get);

router.post('/post_form', passport.authorize, passport.verify, post_controller.post_create);

router.put('/post_update', passport.authorize, passport.verify, post_controller.post_update);

router.delete('/post_delete', passport.authorize, passport.verify, post_controller.post_delete);

module.exports = router;