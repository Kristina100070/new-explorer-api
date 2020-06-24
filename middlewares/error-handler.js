
const { SERVER_ERROR } = require('../errors-message/errors-message');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = SERVER_ERROR } = err;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
