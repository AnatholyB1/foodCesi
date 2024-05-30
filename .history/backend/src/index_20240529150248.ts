import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 8000;

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/';

app.get('/', (req, res) => {
  res.send('Hello World! 56');
});

mongoose.connect(mongodbUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 