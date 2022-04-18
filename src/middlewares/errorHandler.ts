import { ErrorRequestHandler, NextFunction } from 'express';
import { AppError } from '../helpers/AppError';
import { StatusCodes } from 'http-status-codes';

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err.name === 'SyntaxError') err = new AppError(400, 'Unexpected Syntax');
  else if (err.name === 'ValidationError') err = new AppError(400, err.message);
  else if (err.name === 'CastError')
    err = new AppError(400, 'Please provide a valid id');
  else if (err.code === 11000)
    err = new AppError(400, 'Duplicate Key Found : Check Your Input');

  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
