import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { router } from './routers';
import { errorHandler } from './middlewares/errorHandler';
import { connectMongoDb } from './helpers/database';

// Creating app
const app = express();

// MongoDb connection
connectMongoDb();

// Cors
app.use(cors());

// Json Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/api', router);

// Error Handling
app.use(errorHandler);

// Static File
app.use(express.static(path.join(__dirname, 'uploads')));
/* app.use('/uploads/user', express.static(path.join(__dirname, 'public'))); */

// Running server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on the port: ${port}`);
});
