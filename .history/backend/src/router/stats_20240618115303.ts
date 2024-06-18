import express from 'express';
import { getMongoDBStats, getMySQLStats } from '../controllers/stats';

export default (router: express.Router): void => {
    router.get('/stats/mongodb', getMongoDBStats);
    router.get('/stats/mysql', getMySQLStats);
    };