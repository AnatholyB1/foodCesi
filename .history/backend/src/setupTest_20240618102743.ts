import mongoose from "mongoose";
import dotenv from "dotenv";
import sequelize from "./db";
dotenv.config();

beforeAll(async () => {
  const port = process.env.PORT || 8000;

  const mongodbUrl =
    process.env.DATABASE_URL || "mongodb://database:27017/mydb";

  // Fonction pour établir la connexion MongoDB
  async function connectMongoDB() {
    try {
      await mongoose.connect(mongodbUrl);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
  }

  async function startServer() {
    await connectMongoDB();
  }

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db synced successfully.");
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
  startServer();
});
