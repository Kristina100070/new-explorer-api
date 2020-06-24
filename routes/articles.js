const router = require('express').Router();

const articleController = require('../controllers/articles.js');
const { articleCreateValidator } = require('../middlewares/validator');

router.get('/', articleController.findArticles);
router.post('/', articleCreateValidator, articleController.createArticle);
router.delete('/:articleId', articleController.deleteArticle);

module.exports = router;
