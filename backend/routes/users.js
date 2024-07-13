const express = require('express');
const passport = require('../config/passport');

const router = express.Router();
const user_controller = require('../controllers/userController');

router.post('/register', user_controller.user_register);

router.post('/login', user_controller.user_login);

router.post('/profile_info', passport.authorize, passport.verify, user_controller.user_profile_info);

router.get('/user_posts', passport.authorize, passport.verify, user_controller.user_post_list);

module.exports = router;