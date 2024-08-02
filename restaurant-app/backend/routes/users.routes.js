const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');

/* GET users listing. */
router.post('/login', user.login);
router.post('/signup', user.register);
router.post('/logout', user.logout);

module.exports = router;
