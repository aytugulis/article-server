import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import { HydratedDocument } from 'mongoose';
const { ARTICLE_JWT_SECRET_KEY, ARTICLE_JWT_EXPIRE } = process.env;
if (!ARTICLE_JWT_SECRET_KEY || !ARTICLE_JWT_EXPIRE)
  throw new Error('There is no ARTICLE_JWT_SECRET_KEY or ARTICLE_JWT_EXPIRE');

export const generateJwt = (user: HydratedDocument<IUser>) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
    description: user.description,
  };

  return jwt.sign(payload, ARTICLE_JWT_SECRET_KEY, {
    expiresIn: ARTICLE_JWT_EXPIRE,
  });
};
