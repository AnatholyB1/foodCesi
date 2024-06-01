import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import router from '@/router/index'

const app = express();
const server = http.createServer(app);
dotenv.config();

const port = process.env.PORT || 8000;

const mongodbUrl = process.env.DATABASE_URL || 'mongodb://database:27017/mydb';


mongoose.connect(mongodbUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 



app.use('/', router())