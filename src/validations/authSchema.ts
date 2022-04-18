import Joi from 'joi';

export const registerSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .regex(/^\S+@\S+\.\S+$/)
      .required(),
    password: Joi.string().min(8).required(),
  }),
});

export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .regex(/^\S+@\S+\.\S+$/)
      .required(),
    password: Joi.string().min(8).required(),
  }),
});
