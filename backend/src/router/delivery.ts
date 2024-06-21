import express from 'express';

import {getAllDeliveries,getADeliveryById,createADelivery,updateADelivery,deleteADelivery,getAllDeliveriesByUserId,getAllDeliveriesByCity,getADeliveryByUserIdAndCity} from '../controllers/delivery'


export default (router: express.Router) => {
    /**
     * @swagger
     * tags:
     *   name: Delivery
     *   description: Operations about deliveries
     */

    router.get('/delivery', getAllDeliveries);
/**
 * @swagger
 * /delivery:
 *   get:
 *     tags: [Delivery]
 *     description: Récupère toutes les livraisons disponibles
 *     responses:
 *       200:
 *         description: Succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de la livraison
 *               user_id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur associé à la livraison
 *               city:
 *                 type: string
 *                 description: La ville de la livraison
 *               available:
 *                 type: boolean
 *                 description: Indique si la livraison est disponible ou non
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Aucune livraison trouvée
 */
    router.get('/delivery/:id', getADeliveryById);
    /**
 * @swagger
 * /delivery/{id}:
 *   get:
 *     tags: [Delivery]
 *     description: Récupère une livraison par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la livraison
 *     responses:
 *       200:
 *         description: Livraison récupérée avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de la livraison
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             city:
 *               type: string
 *               description: La ville de la livraison
 *             available:
 *               type: boolean
 *               description: Disponibilité de la livraison
 *       404:
 *         description: Livraison non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
    router.post('/delivery', createADelivery);
    /**
 * @swagger
 * /delivery:
 *   post:
 *     tags: [Delivery]
 *     description: Crée une nouvelle livraison
 *     parameters:
 *       - in: body
 *         name: delivery
 *         description: Les informations de la livraison
 *         schema:
 *           type: object
 *           required:
 *             - user_id
 *             - city
 *             - available
 *           properties:
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             city:
 *               type: string
 *               description: La ville de la livraison
 *             available:
 *               type: boolean
 *               description: Disponibilité de la livraison
 *     responses:
 *       201:
 *         description: Livraison créée avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de la livraison
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             city:
 *               type: string
 *               description: La ville de la livraison
 *             available:
 *               type: boolean
 *               description: Disponibilité de la livraison
 *       400:
 *         description: Paramètre manquant
 *       500:
 *         description: Erreur interne du serveur
 */
    router.put('/delivery/:id', updateADelivery);
    /**
 * @swagger
 * /delivery/{id}:
 *   put:
 *     tags: [Delivery]
 *     description: Met à jour une livraison par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la livraison
 *       - in: body
 *         name: delivery
 *         description: Les informations mises à jour de la livraison
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             city:
 *               type: string
 *               description: La ville de la livraison
 *             available:
 *               type: boolean
 *               description: Disponibilité de la livraison
 *     responses:
 *       200:
 *         description: Livraison mise à jour avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de la livraison
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             city:
 *               type: string
 *               description: La ville de la livraison
 *             available:
 *               type: boolean
 *               description: Disponibilité de la livraison
 *       400:
 *         description: Paramètre manquant
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/delivery/:id', deleteADelivery);
    /**
 * @swagger
 * /delivery/{id}:
 *   delete:
 *     tags: [Delivery]
 *     description: Supprime une livraison par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la livraison
 *     responses:
 *       200:
 *         description: Livraison supprimée avec succès
 *       404:
 *         description: Livraison non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/delivery/user/:user_id', getAllDeliveriesByUserId);
    /**
 * @swagger
 * /delivery/user/{user_id}:
 *   get:
 *     tags: [Delivery]
 *     description: Récupère toutes les livraisons par identifiant d'utilisateur
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des livraisons récupérée avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de la livraison
 *               user_id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur
 *               city:
 *                 type: string
 *                 description: La ville de la livraison
 *               available:
 *                 type: boolean
 *                 description: Disponibilité de la livraison
 *       404:
 *         description: Livraisons non trouvées
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/delivery/city/:city', getAllDeliveriesByCity);
    /**
 * @swagger
 * /delivery/city/{city}:
 *   get:
 *     tags: [Delivery]
 *     description: Récupère toutes les livraisons par ville
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Le nom de la ville
 *     responses:
 *       200:
 *         description: Liste des livraisons récupérée avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de la livraison
 *               user_id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur
 *               city:
 *                 type: string
 *                 description: La ville de la livraison
 *               available:
 *                 type: boolean
 *                 description: Disponibilité de la livraison
 *       404:
 *         description: Livraisons non trouvées
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/delivery/user/:user_id/city/:city', getADeliveryByUserIdAndCity);
    /**
 * @swagger
 * /delivery/user/{user_id}/city/{city}:
 *   get:
 *     tags: [Delivery]
 *     description: Récupère une livraison par identifiant d'utilisateur et ville
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'utilisateur
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Le nom de la ville
 *     responses:
 *       200:
 *         description: Livraison récupérée avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de la livraison
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             city:
 *               type: string
 *               description: La ville de la livraison
 *             available:
 *               type: boolean
 *               description: Disponibilité de la livraison
 *       400:
 *         description: Paramètre manquant ou invalide
 *       500:
 *         description: Erreur interne du serveur
 */
}
