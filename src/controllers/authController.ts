import { IUser } from './../models/User';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { AppError } from '../helpers/AppError';
import asyncHandler from 'express-async-handler';
import { User } from '../models/User';
import { generateJwt } from '../helpers/authHelper';
import { StatusCodes } from 'http-status-codes';

interface RegisterBody {
  name: string;
  description: string;
  email: string;
  password: string;
}
interface RegisterResponse extends Omit<IUser, 'password'> {
  _id: string;
  token: string;
}
export const register = asyncHandler(
  async (
    req: Request<{}, {}, RegisterBody>,
    res: Response<RegisterResponse>,
  ) => {
    const { name, description, email, password } = req.body;

    const user = await User.create({
      name,
      description,
      email,
      password,
      imageUrl: req.file?.filename,
    });

    res.status(StatusCodes.CREATED).json({
      token: generateJwt(user),
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      imageUrl: user.imageUrl,
      description: user.description,
    });
  },
);

interface LoginBody {
  email: string;
  password: string;
}
interface LoginResponse extends Omit<IUser, 'password'> {
  _id: string;
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
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      imageUrl: user.imageUrl,
      description: user.description,
    });
  },
);

interface EditBody {
  name: string;
  description: string;
  email: string;
}
interface EditResponse extends Omit<IUser, 'password'> {
  message: string;
  _id: string;
}
export const edit = asyncHandler(
  async (req: Request<{}, {}, EditBody>, res: Response<EditResponse>) => {
    const { name, description, email } = req.body;
    const { id, imageUrl } = req.user;
    const filename = req?.file?.filename ? req.file.filename : imageUrl;

    const user = await User.findByIdAndUpdate(
      id,
      { name, description, email, imageUrl: filename },
      { runValidators: true, new: true },
    );
    if (!user) throw new AppError(StatusCodes.BAD_REQUEST, 'Could not update.');

    res.status(StatusCodes.OK).json({
      message: 'User is updated.',
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      imageUrl: user.imageUrl,
      description: user.description,
    });
  },
);
