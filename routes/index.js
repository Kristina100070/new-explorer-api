/* eslint-disable no-undef */
const router = require('express').Router();
const users = require('./users.js');
const articles = require('./articles.js');
const NotFoundError = require('../errors/not-found');

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { userCreateValidator, loginValidator } = require('../middlewares/validator');
const { NOT_FOUND_RESOURCE } = require('../errors-message/errors-message');

router.post('/signin', loginValidator, login);
router.post('/signup', userCreateValidator, createUser);

router.use(auth);
router.use('/articles', articles);
router.use('/users', users);
router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_RESOURCE));
});
module.exports = router;
