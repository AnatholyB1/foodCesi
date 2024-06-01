import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import router from './router/index';

//connect with mysql server
import mysql from 'mysql';


const mysqlConfig  = {
  host: process.env.SERVER_NAME || 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydb'
};

// Fonction pour établir la connexion MySQL
async function connectMySQL() {
  try {
    const connection = await mysql.createConnection(mysqlConfig);
    console.log('Connected to MySQL');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    process.exit(1);
  }
}

const app = express();
const server = http.createServer(app);
dotenv.config();

const port = process.env.PORT || 8000;

const mongodbUrl = process.env.DATABASE_URL || 'mongodb://database:27017/mydb';


// Fonction pour établir la connexion MongoDB
async function connectMongoDB() {
  try {
    await mongoose.connect(mongodbUrl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}


async function startServer() {
  await connectMySQL();
  await connectMongoDB();

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}


startServer();


app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', router())