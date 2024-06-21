import express from 'express';
import {getAllNotifications, getNotification, getNotificationsByUser, removeNotification, removeNotificationsByUser, markNotification, removeAllNotifications} from '../controllers/notifications';

export default (router: express.Router) => {
    /**
     * @swagger
     * tags:
     *   name: Notifications
     *   description: Operations about notifications
     */
    router.get('/notifications', getAllNotifications);
    /**
 * @swagger
 * /notifications:
 *   get:
 *     tags: [Notifications]
 *     description: Récupère toutes les notifications
 *     responses:
 *       200:
 *         description: Liste des notifications récupérée avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: L'identifiant de l'utilisateur
 *               message:
 *                 type: string
 *                 description: Le message de la notification
 *               read:
 *                 type: boolean
 *                 description: Statut de lecture de la notification
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Date de création de la notification
 *       404:
 *         description: Aucune notification trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
   router.delete('/notifications', removeAllNotifications);
   /**
 * @swagger
 * /notifications:
 *   delete:
 *     tags: [Notifications]
 *     summary: Remove all notifications
 *     responses:
 *       200:
 *         description: All notifications successfully removed
 *       500:
 *         description: Internal server error
 */
    router.get('/notifications/:id', getNotification);
    /**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     tags: [Notifications]
 *     description: Récupère une notification par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'identifiant de la notification
 *     responses:
 *       200:
 *         description: Notification récupérée avec succès
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               description: L'identifiant de l'utilisateur
 *             message:
 *               type: string
 *               description: Le message de la notification
 *             read:
 *               type: boolean
 *               description: Statut de lecture de la notification
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: Date de création de la notification
 *       404:
 *         description: Notification non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/notifications/user/:userId', getNotificationsByUser);
    /**
 * @swagger
 * /notifications/user/{userId}:
 *   get:
 *     tags: [Notifications]
 *     description: Récupère les notifications par ID d'utilisateur
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'identifiant de l'utilisateur
 *     responses:
 *       200:
 *         description: Notifications récupérées avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: L'identifiant de l'utilisateur
 *               message:
 *                 type: string
 *                 description: Le message de la notification
 *               read:
 *                 type: boolean
 *                 description: Statut de lecture de la notification
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Date de création de la notification
 *       404:
 *         description: Aucune notification trouvée pour cet utilisateur
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/notifications/:id', removeNotification);
    /**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     tags: [Notifications]
 *     description: Supprime une notification par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'identifiant de la notification
 *     responses:
 *       200:
 *         description: Notification supprimée avec succès
 *       400:
 *         description: Requête invalide, identifiant manquant
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/notifications/user/:userId', removeNotificationsByUser);
    /**
 * @swagger
 * /notifications/user/{userId}:
 *   delete:
 *     tags: [Notifications]
 *     description: Supprime toutes les notifications par ID d'utilisateur
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'identifiant de l'utilisateur
 *     responses:
 *       200:
 *         description: Notifications supprimées avec succès
 *       400:
 *         description: Requête invalide, identifiant manquant
 *       500:
 *         description: Erreur interne du serveur
 */
    router.put('/notifications/:id', markNotification);
    /**
 * @swagger
 * /notifications/{id}:
 *   put:
 *     tags: [Notifications]
 *     description: Marque une notification comme lue par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'identifiant de la notification
 *     responses:
 *       200:
 *         description: Notification marquée comme lue avec succès
 *       400:
 *         description: Requête invalide, identifiant manquant
 *       500:
 *         description: Erreur interne du serveur
 */
}
