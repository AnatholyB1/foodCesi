import express from 'express';

import {getAllLogs, getAllLogsByInfoTypeAndDateRange, getAllLogsByDateRange, getAllLogsByDate,getAllLogsByInfoType, deleteALogById, deleteAllLogs, getALogById } from '../controllers/log'


export default (router: express.Router) => {
    /**
     * @swagger
     * tags:
     *   name: Log
     *   description: Operations about user authentication
     */

    router.get('/log', getAllLogs);
    /**
 * @swagger
 * /log:
 *   get:
 *     tags: [Log]
 *     description: Récupère tous les logs
 *     responses:
 *       200:
 *         description: Succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: L'identifiant du log
 *               message:
 *                 type: string
 *                 description: Le message du log
 *               level:
 *                 type: string
 *                 description: Le niveau du log (e.g., info, error)
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure du log
 *       401:
 *         description: Unauthorized
 */
    router.get('/log/:id', getALogById);
    /**
 * @swagger
 * /log/{id}:
 *   get:
 *     tags: [Log]
 *     description: Récupère un log par ID
 *     parameters:
*       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: L'identifiant du log
 *     responses:
 *       200:
 *         description: Succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: L'identifiant du log
 *             message:
 *               type: string
 *               description: Le message du log
 *             level:
 *               type: string
 *               description: Le niveau du log (e.g., info, error)
 *             timestamp:
 *               type: string
 *               format: date-time
 *               description: La date et l'heure du log
 *       404:
 *         description: Log non trouvé
 *       401:
 *         description: Unauthorized
 */
    router.delete('/log/:id', deleteALogById);
/**
 * @swagger
 * /log/{id}:
 *   delete:
 *     tags: [Log]
 *     description: Supprime un log par ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: L'identifiant du log
 *     responses:
 *       200:
 *         description: Log supprimé avec succès
 *       404:
 *         description: Log non trouvé
 *       401:
 *         description: Unauthorized
 */

    router.delete('/log', deleteAllLogs);
/**
 * @swagger
 * /log:
 *   delete:
 *     tags: [Log]
 *     description: Supprime tous les logs
 *     responses:
 *       200:
 *         description: Tous les logs ont été supprimés avec succès
 *       401:
 *         description: Unauthorized
 */

    
    router.get('/log/infoType/:infoType', getAllLogsByInfoType);
/**
 * @swagger
 * /log/infoType/{infoType}:
 *   get:
 *     tags: [Log]
 *     description: Récupère tous les logs par type d'information
 *     parameters:
 *       - name: infoType
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Le type d'information du log (info, warn, error)
 *     responses:
 *       200:
 *         description: Succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: L'identifiant du log
 *               message:
 *                 type: string
 *                 description: Le message du log
 *               level:
 *                 type: string
 *                 description: Le niveau du log (info, warn, error)
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure du log
 *       401:
 *         description: Unauthorized
 */

    router.get('/log/date/:date', getAllLogsByDate);
/**
 * @swagger
 * /log/date/{date}:
 *   get:
 *     tags: [Log]
 *     description: Récupère tous les logs par date
 *     parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: La date des logs (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: L'identifiant du log
 *               message:
 *                 type: string
 *                 description: Le message du log
 *               level:
 *                 type: string
 *                 description: Le niveau du log (info, warn, error)
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure du log
 *       401:
 *         description: Unauthorized
 */

    router.get('/log/dateRange/:startDate/:endDate', getAllLogsByDateRange);
/**
 * @swagger
 * /log/dateRange/{startDate}/{endDate}:
 *   get:
 *     tags: [Log]
 *     description: Récupère tous les logs par plage de dates
 *     parameters:
 *       - name: startDate
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: La date de début des logs (YYYY-MM-DD)
 *       - name: endDate
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: La date de fin des logs (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: L'identifiant du log
 *               message:
 *                 type: string
 *                 description: Le message du log
 *               level:
 *                 type: string
 *                 description: Le niveau du log (info, warn, error)
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure du log
 *       401:
 *         description: Unauthorized
 */

    router.get('/log/infoTypeDateRange/:infoType/:startDate/:endDate', getAllLogsByInfoTypeAndDateRange);
/**
 * @swagger
 * /log/infoTypeDateRange/{infoType}/{startDate}/{endDate}:
 *   get:
 *     tags: [Log]
 *     description: Récupère tous les logs par type d'information et plage de dates
 *     parameters:
 *       - name: infoType
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Le type d'information du log (info, warn, error)
 *       - name: startDate
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: La date de début des logs (YYYY-MM-DD)
 *       - name: endDate
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: La date de fin des logs (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: L'identifiant du log
 *               message:
 *                 type: string
 *                 description: Le message du log
 *               level:
 *                 type: string
 *                 description: Le niveau du log (info, warn, error)
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure du log
 *       401:
 *         description: Unauthorized
 */
}