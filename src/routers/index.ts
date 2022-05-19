import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { articleRouter } from './articleRouter';
import { Router } from 'express';

export const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/article', articleRouter);
