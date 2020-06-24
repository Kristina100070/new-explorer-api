const router = require('express').Router();
const userController = require('../controllers/users.js');

router.get('/me', userController.getUser);

module.exports = router;
