import { AppError } from './../helpers/AppError';
import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body, query, params } = req;

    const { error } = schema.validate(
      { body, query, params },
      { allowUnknown: true },
    );
    if (error) throw new AppError(400, error.details[0].message);

    next();
  };
};
