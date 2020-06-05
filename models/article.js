
const mongoose = require('mongoose');
// eslint-disable-next-line no-undef
const validator = require('validator');

const articleSchema = new mongoose.Schema({

  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
