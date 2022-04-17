import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authRouter, userRouter } from './routers';
import { errorHandler } from './middlewares/errorHandler';
import { connectMongoDb } from './helpers/database';

// Creating app
const app = express();

// MongoDb connection
connectMongoDb();

// Option middlewares
app.use(cors());
app.use(express.json());

// Routers
app.use('/user', userRouter);
app.use('/auth', authRouter);

// Error Handling
app.use(errorHandler);

// Running server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on the port: ${port}`);
});
