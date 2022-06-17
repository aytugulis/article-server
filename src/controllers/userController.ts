import { NextFunction, Request, Response } from 'express';
import { AppError } from '../helpers/AppError';
import asyncHandler from 'express-async-handler';
import { Article } from '../models/Article';
import StatusCodes from 'http-status-codes';

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return next(new AppError(400, 'Test error'));
    res.json({ message: 'Test message' });
  },
);

export const getTopAuthors = asyncHandler(
  async (req: Request, res: Response) => {
    const topAuthors = await Article.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $group: {
          _id: {
            _id: { $first: '$author._id' },
            name: { $first: '$author.name' },
            description: { $first: '$author.description' },
            imageUrl: { $first: '$author.imageUrl' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          author: '$_id',
          count: 1,
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(StatusCodes.OK).json({ topAuthors });
  },
);
