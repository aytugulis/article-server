import { AppError } from './../helpers/AppError';
import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

interface ValidationProps {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
}

export const validate = ({ body, query, params }: ValidationProps) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (body) {
      const { error } = body.validate(req.body);
      if (error) throw new AppError(400, error.message);
    }
    if (query) {
      const { error } = query.validate(req.query);
      if (error) throw new AppError(400, error.message);
    }
    if (params) {
      const { error } = params.validate(req.params);
      if (error) throw new AppError(400, error.message);
    }

    next();
  };
};
