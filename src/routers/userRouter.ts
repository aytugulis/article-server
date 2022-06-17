import { Router } from 'express';
import { getUser, getTopAuthors } from '../controllers/userController';

export const userRouter = Router();

userRouter.get('/', getUser);
userRouter.get('/get-top-authors', getTopAuthors);
