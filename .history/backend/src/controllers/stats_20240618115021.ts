import mongoose from "mongoose";
import sequelize  from "../db";

async function getMongoDBStats() {
    const stats = await mongoose.connection.db.command({ dbStats: 1 });
    return stats;
  }

  async function getMySQLStats() {
    const [stats] = await sequelize.query('SHOW STATUS');
    return stats;
  }