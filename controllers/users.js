const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { JWT_SECRET } = require('../config/index');
const BadRequestError = require('../errors/bad-request');

const Conflict = require('../errors/сonflict');

const {
  INCORRECT_PASSWORD,
  SUCCESSFUL_REGISTRATION,
  NOT_FOUND_USER,
  MAIL_ADDRESS_BUSY,
} = require('../errors-message/errors-message');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  if (password.length < 8) {
    throw new BadRequestError(INCORRECT_PASSWORD);
  }
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name, email, password: hash,
    }))
    .then(() => {
      res.status(201).send({ message: SUCCESSFUL_REGISTRATION });
    })
    .catch((err) => {
      if (err.name === 'MongoError') {
        next(new Conflict(MAIL_ADDRESS_BUSY));
      }
    });
};
const login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new BadRequestError(NOT_FOUND_USER);
      }
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};
module.exports = {
  getUser,
  createUser,
  login,
};
