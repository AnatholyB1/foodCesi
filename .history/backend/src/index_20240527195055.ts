import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';


const app = express();

app.use(cors({
  credentials: true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello World! 54');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
