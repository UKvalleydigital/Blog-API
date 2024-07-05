const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

router.get('/register', (req, res) => res.json({ 'msg': 'hello' }));

router.post('/register', user_controller.user_register);

router.post('/login', function(req, res) {
    user_controller.user_login;
});

module.exports = router;