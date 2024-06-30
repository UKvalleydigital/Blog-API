const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => res.json({ 'msg': 'hello' }));

router.use(require('./users'));
router.use(require('./posts'));
router.use(require('./comments'));

module.exports = router;
