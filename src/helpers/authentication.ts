import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { IUser } from '../models/User';
import { HydratedDocument } from 'mongoose';
const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
if (!JWT_SECRET_KEY || !JWT_EXPIRE)
  throw new Error('There is no JWT_SECRET_KEY or JWT_EXPIRE');

export const hashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err: unknown, hash: string) {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

export const generateJwt = (user: HydratedDocument<IUser>) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  return sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE,
  });
};
