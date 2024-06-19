const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

router.get('/login', function(req, res) {
    res.json();
})

router.post('/login', function(req, res) {
    user_controller.user_login;
});

router.post('/register', user_controller.user_register);

module.exports = router;

// More routes to be added later