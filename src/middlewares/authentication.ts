import jwt from 'jsonwebtoken';
import { AppError } from './../helpers/AppError';
import { NextFunction, Request, Response } from 'express';
const { JWT_SECRET_KEY } = process.env;
if (!JWT_SECRET_KEY) throw new AppError(500, 'There is no JWT_SECRET_KEY.');

interface JwtPayload {
  id: string;
  name: string;
  email: string;
}

export const IsLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer'))
    throw new AppError(401, 'You are not authorized.');

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };

    next();
  } catch (err) {
    throw new AppError(401, 'You are not authorized.');
  }
};
