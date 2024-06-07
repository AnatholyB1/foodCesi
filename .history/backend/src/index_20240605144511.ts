import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


import router from './router/index';


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
  await connectMongoDB();

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}


startServer();


app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', router())

 
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API cesiEats',
      description: 'Documentation de l\'API cesiEats',
      version: '1.0.0',
      contact: {
        name: 'anatholyb@gmail.com',
      },
      servers: ['http://localhost:8000'],
    },
  },
  apis: ['./src/router/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));