import { Schema, model } from 'mongoose';
import { IUser } from './User';

export interface IArticle {
  header: string;
  content: string;
  imageUrl: string;
  author: IUser;
}

const ArticleSchema = new Schema<IArticle>({
  header: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true, default: 'default.jpg' },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Article = model('Article', ArticleSchema);
