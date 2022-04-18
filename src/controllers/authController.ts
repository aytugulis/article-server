import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { AppError } from '../helpers/AppError';
import asyncHandler from 'express-async-handler';
import { User } from '../models/User';
import { generateJwt } from '../helpers/authentication';
import { StatusCodes } from 'http-status-codes';

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}
interface RegisterResponse {
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

    res.status(StatusCodes.CREATED).json({
      token: generateJwt(user),
    });
  },
);

interface LoginBody {
  email: string;
  password: string;
}
interface LoginResponse {
  token: string;
}
export const login = asyncHandler(
  async (req: Request<{}, {}, LoginBody>, res: Response<LoginResponse>) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user)
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Incorrect email or password.',
      );

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Incorrect email or password.',
      );

    res.status(StatusCodes.OK).json({
      token: generateJwt(user),
    });
  },
);
