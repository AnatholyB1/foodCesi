import express from 'express';

import {getAlLogs, getAllLogsByInfoTypeAndDateRange, getAllLogsByDateRange, getAllLogsByDate,getAllLogsByInfoType, deleteALogById, deleteAllLogs, getALogById } from '../controllers/log'


export default (router: express.Router) => {
    /**
     * @swagger
     * /log:
     *   get:
     *     description: Récupère tout les logs
     *     responses:
     *       200:
     *         description: Succès
     */
    router.post('/log', getAlLogs);
    router.get('/log/:id', getALogById);
    router.delete('/log/:id', deleteALogById);
    router.delete('/log', deleteAllLogs);
    router.get('/log/infoType/:infoType', getAllLogsByInfoType);
    router.get('/log/date/:date', getAllLogsByDate);
    router.get('/log/dateRange/:startDate/:endDate', getAllLogsByDateRange);
    router.get('/log/infoTypeDateRange/:infoType/:startDate/:endDate', getAllLogsByInfoTypeAndDateRange);
}