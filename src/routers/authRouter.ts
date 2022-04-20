import { validate } from './../middlewares/validate';
import { IsLoggedIn } from './../middlewares/authentication';
import { Router } from 'express';
import { register, login, edit } from '../controllers/authController';
import {
  registerBodySchema,
  loginBodySchema,
  editBodySchema,
} from '../validations/authSchema';

export const authRouter = Router();

authRouter.post(
  '/register',
  [validate({ body: registerBodySchema })],
  register,
);
authRouter.post('/login', [validate({ body: loginBodySchema })], login);
authRouter.put('/edit', [IsLoggedIn, validate({ body: editBodySchema })], edit);
