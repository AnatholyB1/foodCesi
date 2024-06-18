import express from 'express';
import { getMongoStats, getMySQLStats } from '../controllers/stats';

export default (router: express.Router): void => {
    router.get('/stats/mongodb', getMongoStats);
    router.get('/stats/mysql', getMySQLStats);
    };