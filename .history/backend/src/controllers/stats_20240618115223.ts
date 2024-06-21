import mongoose from "mongoose";
import sequelize  from "../db";

export async function getMongoDBStats() {
    const stats = await mongoose.connection.db.command({ dbStats: 1 });
    return stats;
  }

export   async function getMySQLStats() {
    const [stats] = await sequelize.query('SHOW STATUS');
    return stats;
  }