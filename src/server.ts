import { AppError } from './helpers/AppError';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router } from './routers';
import { errorHandler } from './middlewares/errorHandler';
import { connectMongoDb } from './helpers/database';

// Creating app
const app = express();

/* // Adding cors middleware
app.use(cors()); */

// MongoDb connection
connectMongoDb();

// Option middlewares
app.use(cors());
app.use(express.json());

// Root and test endpoint on test environment
if (process.env.NODE_ENV === 'development') {
  app.get('/', (req, res) => res.send('Hello World'));
  app.get('/test', (req, res) => {
    res.status(200).json({ name: 'aytug' });
    /*     throw new AppError(500, 'custom error message'); */
  });
}

// Routers
app.use('/api', router);

// Error Handling
app.use(errorHandler);

// Running server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on the port: ${port}`);
});
