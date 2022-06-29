import { Router } from 'express';
import {
  getArticles,
  getOneArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articleController';
import { isAuthorized, isArticleOwner } from '../middlewares/authentication';
import { uploadFile } from '../middlewares/uploadFile';
import { validate } from '../middlewares/validate';
import {
  createArticleBodySchema,
  updateArticleBodySchema,
} from '../validations/articleSchema';

export const articleRouter = Router();

articleRouter.get('/', getArticles);
articleRouter.get('/:articleId', getOneArticle);
articleRouter.post(
  '/',
  [
    isAuthorized,
    uploadFile('article').single('file'),
    validate({ body: createArticleBodySchema }),
  ],
  createArticle,
);
articleRouter.put(
  '/:articleId',
  [isAuthorized, isArticleOwner, validate({ body: updateArticleBodySchema })],
  updateArticle,
);
articleRouter.delete(
  '/:articleId',
  [isAuthorized, isArticleOwner],
  deleteArticle,
);
