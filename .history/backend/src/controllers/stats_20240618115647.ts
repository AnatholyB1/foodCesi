import mongoose from "mongoose";
import sequelize  from "../db";
import { withLogging } from "../helpers";


async function getMongoDBStats() {
    const stats = await mongoose.connection.db.command({ dbStats: 1 });
    return stats;
  }

async function getMySQLDBStats() {
    const [stats] = await sequelize.query('SHOW STATUS');
    return stats;
  }

export const getMongoStats = withLogging(
    "getMongoStats",
    async (req: any, res: any) => {
      try {
        const stats = await getMongoDBStats();
        if (!stats) {
          return res.status(404).end();
        }
        return res.status(200).json(stats).end();
      } catch (error) {
        console.log(error);
        return res.status(500);
      }
    }
  );

export const getMySQLStats = withLogging(
    "getMySQLStats",
    async (req: any, res: any) => {
      try {
        const stats = await getMySQLDBStats();
        if (!stats) {
          return res.status(404).end();
        }
        return res.status(200).json(stats).end();
      } catch (error) {
        console.log(error);
        return res.status(500);
      }
    }
  );

