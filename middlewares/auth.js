const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');
const { JWT_SECRET } = require('../config/index');
const { NEED_AUTHORIZATION } = require('../errors-message/errors-message');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized(NEED_AUTHORIZATION);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Unauthorized(NEED_AUTHORIZATION);
  }

  req.user = payload;
  next();
};
