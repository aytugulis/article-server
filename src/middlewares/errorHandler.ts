import { Request, Response, NextFunction } from 'express';
import { AppError } from '../helpers/AppError';
import { Error } from 'mongoose';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  /*   if (err.name === 'SyntaxError') err = new AppError(400, 'Unexpected Syntax');
  else if (err.name === 'ValidationError') err = new AppError(400, err.message);
  else if (err.name === 'CastError')
    err = new AppError(400, 'Please provide a valid id');
  else if (err.code === 11000)
    err = new AppError(400, 'Duplicate Key Found : Check Your Input'); // Duplicate Key */

  if (err instanceof AppError) {
    res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: err.message,
  });
};
