import { NextFunction, Request, Response } from 'express';
import { AppError } from '../helpers/AppError';
import asyncHandler from 'express-async-handler';
import { User } from '../models/User';
import { generateJwt } from '../helpers/authentication';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    success: true,
    token: generateJwt(user),
  });
});
