import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Article } from '../models/Article';
import StatusCodes from 'http-status-codes';
import { User } from '../models/User';

// Get one user
interface GetUserParams {
  userId: string;
}

export const getOneUser = asyncHandler(
  async (req: Request<GetUserParams, {}, {}, {}>, res: Response) => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    res.status(StatusCodes.OK).json(user);
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
      { $limit: 3 },
    ]);

    res.status(StatusCodes.OK).json({ topAuthors });
  },
);
