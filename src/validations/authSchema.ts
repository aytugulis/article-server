import Joi from 'joi';

export const registerBodySchema = Joi.object({
  name: Joi.string().max(30).required(),
  description: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const loginBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const editBodySchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  description: Joi.string().max(50).required(),
});
