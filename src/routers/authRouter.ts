import { validate } from './../middlewares/validate';
import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { registerSchema, loginSchema } from '../validations/authSchema';

export const authRouter = Router();

authRouter.post('/register', [validate(registerSchema)], register);
authRouter.post('/login', [validate(loginSchema)], login);
