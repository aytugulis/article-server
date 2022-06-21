import { Router } from 'express';
import { getOneUser, getTopAuthors } from '../controllers/userController';

export const userRouter = Router();

userRouter.get('/get-top-authors', getTopAuthors);
userRouter.get('/:userId', getOneUser);
