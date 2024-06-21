import express from 'express';
import { getMongoStats, getMySQLStats,getDockerStats } from '../controllers/stats';

export default (router: express.Router): void => {
    /**
 * @swagger
 * tags:
 *   name: Stats
 *   description: Operations to retrieve various system statistics
 */
    router.get('/stats/mongodb', getMongoStats);
    /**
 * @swagger
 * /stats/mongodb:
 *   get:
 *     tags: [Stats]
 *     summary: Get MongoDB statistics
 *     responses:
 *       200:
 *         description: MongoDB stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 db:
 *                   type: string
 *                 collections:
 *                   type: integer
 *                 views:
 *                   type: integer
 *                 objects:
 *                   type: integer
 *                 avgObjSize:
 *                   type: number
 *                 dataSize:
 *                   type: number
 *                 storageSize:
 *                   type: number
 *                 indexes:
 *                   type: integer
 *                 indexSize:
 *                   type: number
 *       404:
 *         description: Stats not found
 *       500:
 *         description: Internal server error
 */
    router.get('/stats/mysql', getMySQLStats);
    /**
 * @swagger
 * /stats/mysql:
 *   get:
 *     tags: [Stats]
 *     summary: Get MySQL statistics
 *     responses:
 *       200:
 *         description: MySQL stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Variable_name:
 *                     type: string
 *                   Value:
 *                     type: string
 *       404:
 *         description: Stats not found
 *       500:
 *         description: Internal server error
 */
    router.get('/stats/docker', getDockerStats);
    /**
 * @swagger
 * /stats/docker:
 *   get:
 *     tags: [Stats]
 *     summary: Get Docker container statistics
 *     responses:
 *       200:
 *         description: Docker stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   containerId:
 *                     type: string
 *                   stats:
 *                     type: object
 *       404:
 *         description: Stats not found
 *       500:
 *         description: Internal server error
 */
    };