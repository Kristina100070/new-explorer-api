const articleModel = require('../models/article');

const NotFoundError = require('../errors/not-found');
const Forbidden = require('../errors/forbidden');
const { NOT_FOUND_ARTICLE, NOT_FOUND_SAVE_ARTICLES, IMPOSSIBLE_ACTION } = require('../errors-message/errors-message');

const findArticles = (req, res, next) => {
  const owner = req.user;

  articleModel.find({ owner })
    .then((article) => {
      if (article.length === 0) {
        throw new NotFoundError(NOT_FOUND_SAVE_ARTICLES);
      }
      res.json(article);
    })
    .catch(next);
};
const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user;
  articleModel.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => {
      res.status(201).send({ data: article });
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  articleModel.findById(req.params.articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(NOT_FOUND_ARTICLE);
      }
      if (article.owner.toString() !== req.user._id) {
        throw new Forbidden(IMPOSSIBLE_ACTION);
      }
      articleModel.findByIdAndRemove(req.params.articleId)
      // eslint-disable-next-line no-shadow
        .then((article) => res.status(200).send({ data: article }));
    })
    .catch(next);
};
module.exports = {
  findArticles,
  createArticle,
  deleteArticle,
};
