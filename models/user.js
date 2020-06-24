const mongoose = require('mongoose');

const validator = require('validator');
const bcrypt = require('bcryptjs');
const { MISMATCH_REQUEST } = require('../errors-message/errors-message');
const Unauthorized = require('../errors/unauthorized');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized(MISMATCH_REQUEST));
      }

      // eslint-disable-next-line no-undef
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized(MISMATCH_REQUEST));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
