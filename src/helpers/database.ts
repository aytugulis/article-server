import { connect } from 'mongoose';
const { ARTICLE_MONGO_URI } = process.env;
if (!ARTICLE_MONGO_URI) throw new Error('There is no ARTICLE_MONGO_URI');

export const connectMongoDb = async () => {
  try {
    console.log('MongoDb is working');
    await connect(ARTICLE_MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};
