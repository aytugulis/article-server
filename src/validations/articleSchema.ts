import Joi from 'joi';

export const createArticleBodySchema = Joi.object({
  header: Joi.string().required(),
  content: Joi.string().required(),
  imageUrl: Joi.string(),
});

export const updateArticleBodySchema = Joi.object({
  header: Joi.string(),
  content: Joi.string(),
  imageUrl: Joi.string(),
}).min(1);
