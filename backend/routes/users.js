const express = require('express');
const router = express.Router();
const passportJWT = require('../config/passport');
const user_controller = require('../controllers/userController');

router.post('/login', passportJWT.authorization, user_controller.user_login);

router.post('/register', user_controller.user_register);

module.exports = router;

// More routes to be added later