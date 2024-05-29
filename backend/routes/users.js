const express = require('express');
const passport = require('passport');
const router = express.Router();
const user_controller = require('../controllers/userController');

router.get('/login', user_controller.user_login);

router.post('/register', user_controller.user_register);

module.exports = router;

// More routes to be added later