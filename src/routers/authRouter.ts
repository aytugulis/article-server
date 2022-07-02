import { validate } from './../middlewares/validate';
import { isAuthorized } from './../middlewares/authentication';
import { Router } from 'express';
import { register, login, edit } from '../controllers/authController';
import {
  registerBodySchema,
  loginBodySchema,
  editBodySchema,
} from '../validations/authSchema';
import { uploadFile } from '../middlewares/file';
import { shapeImage } from '../middlewares/sharp';

export const authRouter = Router();

authRouter.post(
  '/register',
  [
    uploadFile('user').single('file'),
    shapeImage,
    validate({ body: registerBodySchema }),
  ],
  register,
);
authRouter.post('/login', [validate({ body: loginBodySchema })], login);
authRouter.put(
  '/edit',
  [isAuthorized, validate({ body: editBodySchema })],
  edit,
);
