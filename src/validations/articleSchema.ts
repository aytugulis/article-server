import Joi from 'joi';

export const createArticleBodySchema = Joi.object({
  header: Joi.string().required(),
  content: Joi.string().required(),
  category: Joi.string()
    .valid('Frontend', 'Backend', 'Fullstack', 'Devops', 'AI', 'Data')
    .required(),
  imageUrl: Joi.string(),
});

export const updateArticleBodySchema = Joi.object({
  header: Joi.string(),
  content: Joi.string(),
  category: Joi.string().valid(
    'Frontend',
    'Backend',
    'Fullstack',
    'Devops',
    'AI',
    'Data',
  ),
  imageUrl: Joi.string(),
}).min(1);
