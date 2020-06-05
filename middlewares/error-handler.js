
const { SERVER_ERROR, MAIL_ADDRESS_BUSY } = require('../errors-message/errors-message');

const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message = SERVER_ERROR } = err;

  if (err.name === 'MongoError') {
    statusCode = 409;
    message = MAIL_ADDRESS_BUSY;
  }
  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
