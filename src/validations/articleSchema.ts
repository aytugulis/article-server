import Joi from 'joi';
import { removeHtmlTags } from '../helpers/formatter';

const minContentLength = 20;
const maxContentLength = 1000;

export const createArticleBodySchema = Joi.object({
  header: Joi.string().min(3).max(20).required(),
  content: Joi.string()
    .custom((value, helper) => {
      const formattedValue = removeHtmlTags(value);
      if (formattedValue.length < minContentLength)
        return helper.error(
          `content must be at least ${minContentLength} characters`,
        );
      if (formattedValue.length > maxContentLength)
        return helper.error(
          `content must be at most ${maxContentLength} characters`,
        );

      return value;
    })
    .required(),
  category: Joi.string()
    .valid('Frontend', 'Backend', 'Fullstack', 'Devops', 'AI', 'Data')
    .required(),
  imageUrl: Joi.string(),
});

export const updateArticleBodySchema = Joi.object({
  header: Joi.string().min(3).max(20),
  content: Joi.string().custom((value, helper) => {
    const formattedValue = removeHtmlTags(value);
    if (formattedValue.length < minContentLength)
      return helper.error(
        `content must be at least ${minContentLength} characters`,
      );
    if (formattedValue.length > maxContentLength)
      return helper.error(
        `content must be at most ${maxContentLength} characters`,
      );

    return value;
  }),
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
