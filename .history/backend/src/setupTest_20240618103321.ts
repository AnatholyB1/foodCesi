import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';

let sequelize: Sequelize;

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri);
  sequelize = new Sequelize('sqlite::memory:');
  await sequelize.authenticate();
});

afterAll(async () => {
  await mongoose.connection.close();
  await sequelize.close();
});