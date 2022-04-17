import { NextFunction, Request, Response } from 'express';
import { AppError } from '../helpers/AppError';
import asyncHandler from 'express-async-handler';

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return next(new AppError(400, 'Test error'));
    res.json({ message: 'Test message' });
  },
);
