const { Joi, celebrate } = require('celebrate');
const BadRequestError = require('../errors/bad-request');
const {
  LINE_LENGTH,
  INCORRECT_EMAIL,
  INCORRECT_PASSWORD,
  REQUIRED_FIELD,
  INPUT_URL,
} = require('../errors-message/errors-message');

const userCreateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .required()
      .error(new BadRequestError(LINE_LENGTH)),
    email: Joi.string()
      .email()
      .lowercase()
      .required()
      .error(new BadRequestError(INCORRECT_EMAIL)),
    password: Joi.string()
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
      .min(8)
      .required()
      .error(new BadRequestError(INCORRECT_PASSWORD)),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .error(new BadRequestError(INCORRECT_EMAIL)),
    password: Joi.string()
      .required()
      .min(8)
      .error(new BadRequestError(INCORRECT_PASSWORD)),
  }),
});

const articleCreateValidator = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string()
      .required().error(new BadRequestError(REQUIRED_FIELD)),
    title: Joi.string()
      .required().error(new BadRequestError(REQUIRED_FIELD)),
    text: Joi.string()
      .required().error(new BadRequestError(REQUIRED_FIELD)),
    data: Joi.string()
      .required().error(new BadRequestError(REQUIRED_FIELD)),
    source: Joi.string()
      .required().error(new BadRequestError(REQUIRED_FIELD)),
    link: Joi.string()
      .required()
      .pattern(/^https?:\/\//)
      .error(new BadRequestError(INPUT_URL)),
    image: Joi.string()
      .required()
      .pattern(/^https?:\/\//)
      .error(new BadRequestError(INPUT_URL)),
  }),
});


module.exports = {
  userCreateValidator,
  loginValidator,
  articleCreateValidator,
};
