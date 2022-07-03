import { Schema, model } from 'mongoose';
import { IUser } from './User';

export type Category =
  | 'Frontend'
  | 'Backend'
  | 'Fullstack'
  | 'Devops'
  | 'AI'
  | 'Data';

export interface IArticle {
  header: string;
  content: string;
  imageUrl: string;
  category: Category;
  author: IUser;
}

const ArticleSchema = new Schema<IArticle>(
  {
    header: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Fullstack', 'Devops', 'AI', 'Data'],
    },
    imageUrl: { type: String, required: true, default: 'default.webp' },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const Article = model('Article', ArticleSchema);
