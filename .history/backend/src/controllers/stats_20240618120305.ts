import mongoose from "mongoose";
import sequelize  from "../db";
import { withLogging } from "../helpers";

import Docker from 'dockerode';

const docker = new Docker();

async function getAllDockerStats() {
  const containers = await docker.listContainers();
  const stats = await Promise.all(containers.map(async (containerInfo : any) => {
    const container = docker.getContainer(containerInfo.Id);
    const containerStats = await container.stats({ stream: false });
    return {
      containerId: containerInfo.Id,
      stats: containerStats,
    };
  }));
  return stats;
}


async function getMongoDBStats() {
    const stats = await mongoose.connection.db.command({ dbStats: 1 });
    return stats;
  }

async function getMySQLDBStats() {
    const [stats] = await sequelize.query('SHOW STATUS');
    return stats;
  }


export const getDockerStats = withLogging(
    "getDockerStats",
    async (req: any, res: any) => {
      try {
        const stats = await getAllDockerStats();
        if (!stats) {
          return res.status(404).end();
        }
        return res.status(200).json(stats).end();
      } catch (error) {
        console.log(error);
        return res.status(500).json(error).end();
      }
    }
  );  

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
        return res.status(500).json(error).end();
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
        return res.status(500).json(error).end();
      }
    }
  );

