const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');

router.get('/posts', post_controller.post_list);

router.get('/posts/:postId', post_controller.postId_get);

router.get('/post_form', post_controller.post_create_get);

router.post('/post_form', post_controller.post_create_post);

router.put('/posts/:postId', post_controller.postId_update);

router.delete('/posts/:postId', post_controller.postId_delete);

module.exports = router;