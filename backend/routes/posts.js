const express = require('express');
const passport = require('../config/passport');
const router = express.Router();
const post_controller = require('../controllers/postController');

router.get('/posts', post_controller.post_list);

router.get('/posts/:postId', post_controller.postId_get);

router.post('/post_form', passport.authorize, passport.verify, post_controller.post_create_post);

router.put('/posts/:postId', passport.authorize, passport.verify, post_controller.postId_update);

router.delete('/posts/:postId', passport.authorize, passport.verify, post_controller.postId_delete);

module.exports = router;