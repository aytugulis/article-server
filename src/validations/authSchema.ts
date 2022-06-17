import Joi from 'joi';
import { emailRegex } from '../helpers/formatter';

export const registerBodySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  email: Joi.string().regex(emailRegex).required(),
  password: Joi.string().min(8).required(),
});

export const loginBodySchema = Joi.object({
  email: Joi.string().regex(emailRegex).required(),
  password: Joi.string().min(8).required(),
});

export const editBodySchema = Joi.object({
  name: Joi.string().required(),
});
