import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello World! 56');
});

// Connect to MongoDB
mongoose.connect('mongodb://database:27017/mydb', {  useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});