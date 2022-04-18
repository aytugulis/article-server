import { NextFunction, Request, Response } from 'express';
import { AppError } from '../helpers/AppError';
import asyncHandler from 'express-async-handler';
import { User } from '../models/User';
import { generateJwt } from '../helpers/authentication';
import { BaseResponse } from '../types/BaseResponse';
import { StatusCodes } from 'http-status-codes';

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}
interface RegisterResponse extends BaseResponse {
  token: string;
}

export const register = asyncHandler(
  async (
    req: Request<{}, {}, RegisterBody>,
    res: Response<RegisterResponse>,
  ) => {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      token: generateJwt(user),
    });
  },
);
