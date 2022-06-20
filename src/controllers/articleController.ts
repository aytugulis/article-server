import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Article, Category, IArticle } from '../models/Article';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../helpers/AppError';

// Get all articles
interface GetArticles {
  page: string;
  limit: string;
}

interface GetArticlesResponse {
  articles: IArticle[];
  totalPages: number;
  currentPage: number;
}
export const getArticles = asyncHandler(
  async (
    req: Request<{}, {}, {}, GetArticles>,
    res: Response<GetArticlesResponse>,
  ) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;

    const articles = await Article.find()
      .populate({ path: 'author', select: 'name imageUrl' })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort('-createdAt');

    const count = await Article.countDocuments();

    res.status(StatusCodes.OK).json({
      articles,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  },
);

// Get one article
interface GetOneArticleParam {
  articleId: string;
}
interface GetOneArticleResponse {
  article: IArticle;
}
export const getOneArticle = asyncHandler(
  async (
    req: Request<GetOneArticleParam, {}, {}>,
    res: Response<GetOneArticleResponse>,
  ) => {
    const { articleId } = req.params;

    const article = await Article.findById(articleId).populate({
      path: 'author',
      select: 'name imageUrl description',
    });
    if (!article)
      throw new AppError(StatusCodes.NOT_FOUND, 'Article not found.');

    res.status(StatusCodes.CREATED).json({
      article,
    });
  },
);

// Create article
interface CreateArticleBody {
  category: Category;
  header: string;
  content: string;
  imageUrl: string;
}
interface CreateArticleResponse {
  message: string;
  article: IArticle;
}
export const createArticle = asyncHandler(
  async (
    req: Request<{}, {}, CreateArticleBody>,
    res: Response<CreateArticleResponse>,
  ) => {
    const article = await Article.create({ ...req.body, author: req.user.id });

    res.status(StatusCodes.CREATED).json({
      message: 'Article is created',
      article,
    });
  },
);

// Update article
interface UpdateArticleResponse {
  message: string;
  article: IArticle;
}
export const updateArticle = asyncHandler(
  async (req: Request, res: Response<UpdateArticleResponse>) => {
    const { header, content, imageUrl, category } = req.body;

    // req.data Come from middleware
    req.data.header = header || req.data.header;
    req.data.content = content || req.data.content;
    req.data.imageUrl = imageUrl || req.data.imageUrl;
    req.data.category = category || req.data.category;

    req.data = await req.data.save();

    res.status(StatusCodes.OK).json({
      message: 'Article is updated',
      article: req.data,
    });
  },
);

// Delete article
interface DeleteArticleResponse {
  message: string;
}
export const deleteArticle = asyncHandler(
  async (req: Request, res: Response<DeleteArticleResponse>) => {
    // req.data Come from middleware
    await req.data.delete();

    res.status(StatusCodes.OK).json({
      message: 'Article is deleted',
    });
  },
);
