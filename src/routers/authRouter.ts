import { validate } from './../middlewares/validate';
import { Router } from 'express';
import { register } from '../controllers/authController';
import { registerSchema } from '../validations/authSchema';

export const authRouter = Router();

authRouter.post('/register', [validate(registerSchema)], register);
