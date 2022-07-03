import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Article, Category, IArticle } from '../models/Article';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../helpers/AppError';

// Get all articles
interface GetArticles {
  page?: string;
  limit?: string;
  category?: Category;
  author?: Category;
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
    const { category, author } = req.query;
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);

    const condition = {
      ...(category && { category }),
      ...(author && { author }),
    };

    const articles = await Article.find(condition)
      .populate({ path: 'author', select: 'name imageUrl' })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort('-createdAt');

    const count = await Article.countDocuments(condition);

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
}
export const createArticle = asyncHandler(
  async (
    req: Request<{}, {}, CreateArticleBody>,
    res: Response<CreateArticleResponse>,
  ) => {
    await Article.create({
      ...req.body,
      author: req.user.id,
      imageUrl: req.file?.filename,
    });

    res.status(StatusCodes.CREATED).json({ message: 'Article is created' });
  },
);

// Update article
interface UpdateArticleResponse {
  message: string;
}
export const updateArticle = asyncHandler(
  async (req: Request, res: Response<UpdateArticleResponse>) => {
    const { header, content, category } = req.body;

    // req.data Come from middleware
    req.data.header = header || req.data.header;
    req.data.content = content || req.data.content;
    req.data.category = category || req.data.category;
    req.data.imageUrl = req.file!.filename;

    req.data = await req.data.save();

    res.status(StatusCodes.OK).json({ message: 'Article is updated' });
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
