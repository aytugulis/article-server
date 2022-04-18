import { AppError } from './../helpers/AppError';
import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req, { allowUnknown: true });
    if (error) throw new AppError(400, error.message);

    next();
  };
};
