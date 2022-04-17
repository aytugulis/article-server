import { connect } from 'mongoose';
const { MONGO_URI } = process.env;
if (!MONGO_URI) throw new Error('There is no MONGO_URI');

export const connectMongoDb = async () => {
  try {
    console.log('MongoDb is working');
    await connect(MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};
