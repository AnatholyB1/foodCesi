import express from 'express';
import {getOrderCode, compareOrderCode,getAllOrders,getAnOrderById,createAnOrder,updateAnOrder,getAllOrdersByUserId,getAllOrdersByDeliveryId,deleteAnOrder,deleteAllOrdersByUserId, getAllOrdersByRestaurantId} from '../controllers/order'

export default (router: express.Router) => {
    /**
     * @swagger
     * tags:
     *   name: Orders
     *   description: Operations about orders
     */
    router.get('/order/code/:id', getOrderCode);
    router.post('/order/code/:id', compareOrderCode);
    router.get('/order', getAllOrders);
/**
 * @swagger
 * /order:
 *   get:
 *     tags: [Orders]
 *     description: Récupère toutes les commandes
 *     responses:
 *       200:
 *         description: Liste des commandes récupérée avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de la commande
 *               user_id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur
 *               restaurant_id:
 *                 type: integer
 *                 description: L'identifiant du restaurant
 *               delivery_id:
 *                 type: integer
 *                 description: L'identifiant de la livraison
 *               address_id:
 *                 type: integer
 *                 description: L'identifiant de l'adresse
 *               total_price:
 *                 type: number
 *                 description: Le prix total de la commande
 *               status:
 *                 type: string
 *                 description: Le statut de la commande
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/order/:id', getAnOrderById);
    /**
 * @swagger
 * /order/{id}:
 *   get:
 *     tags: [Orders]
 *     description: Récupère une commande par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la commande
 *     responses:
 *       200:
 *         description: Commande récupérée avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de la commande
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             restaurant_id:
 *               type: integer
 *               description: L'identifiant du restaurant
 *             delivery_id:
 *               type: integer
 *               description: L'identifiant de la livraison
 *             address_id:
 *               type: integer
 *               description: L'identifiant de l'adresse
 *             total_price:
 *               type: number
 *               description: Le prix total de la commande
 *             status:
 *               type: string
 *               description: Le statut de la commande
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/order/restaurant/:restaurant_id', getAllOrdersByRestaurantId);
    /**
 * @swagger
 * /order/restaurant/{restaurant_id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get all orders by restaurant ID
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the restaurant
 *     responses:
 *       200:
 *         description: A list of orders for the specified restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   restaurant_id:
 *                     type: integer
 *                   delivery_id:
 *                     type: integer
 *                   address_id:
 *                     type: integer
 *                   total_price:
 *                     type: number
 *                     format: float
 *                   status:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Missing restaurant_id
 *       404:
 *         description: Orders not found
 *       500:
 *         description: Internal server error
 */
    router.post('/order', createAnOrder);
/**
 * @swagger
 * /order:
 *   post:
 *     tags: [Orders]
 *     description: Crée une nouvelle commande
 *     parameters:
 *       - in: body
 *         name: order
 *         description: Les informations de la commande
 *         schema:
 *           type: object
 *           required:
 *             - restaurant_id
 *             - user_id
 *             - address_id
 *             - items
 *           properties:
 *             restaurant_id:
 *               type: integer
 *               description: L'identifiant du restaurant
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             address_id:
 *               type: integer
 *               description: L'identifiant de l'adresse
 *             items:
 *               type: array
 *               description: Liste des items de la commande
 *               items:
 *                 type: object
 *                 properties:
 *                   item_id:
 *                     type: integer
 *                     description: L'identifiant de l'item
 *                   quantity:
 *                     type: integer
 *                     description: La quantité de l'item
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *       400:
 *         description: Informations manquantes ou invalides
 *       500:
 *         description: Erreur interne du serveur
 */
    router.put('/order/:id', updateAnOrder);
    /**
 * @swagger
 * /order/{id}:
 *   put:
 *     tags: [Orders]
 *     description: Met à jour une commande par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la commande
 *       - in: body
 *         name: order
 *         description: Les informations mises à jour de la commande
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             restaurant_id:
 *               type: integer
 *               description: L'identifiant du restaurant
 *             delivery_id:
 *               type: integer
 *               description: L'identifiant de la livraison
 *             address_id:
 *               type: integer
 *               description: L'identifiant de l'adresse
 *             total_price:
 *               type: number
 *               description: Le prix total de la commande
 *             status:
 *               type: string
 *               description: Le statut de la commande
 *     responses:
 *       200:
 *         description: Commande mise à jour avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/order/:id', deleteAnOrder);
/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     tags: [Orders]
 *     description: Supprime une commande par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la commande
 *     responses:
 *       200:
 *         description: Commande supprimée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/order/user/:user_id', deleteAllOrdersByUserId);
    /**
 * @swagger
 * /order/user/{user_id}:
 *   delete:
 *     tags: [Orders]
 *     description: Supprime toutes les commandes d'un utilisateur par ID
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'utilisateur
 *     responses:
 *       200:
 *         description: Commandes de l'utilisateur supprimées avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/order/user/:user_id', getAllOrdersByUserId);
/**
 * @swagger
 * /order/user/{user_id}:
 *   get:
 *     tags: [Orders]
 *     description: Récupère toutes les commandes d'un utilisateur par ID
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'utilisateur
 *     responses:
 *       200:
 *         description: Commandes de l'utilisateur récupérées avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de la commande
 *               user_id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur
 *               restaurant_id:
 *                 type: integer
 *                 description: L'identifiant du restaurant
 *               delivery_id:
 *                 type: integer
 *                 description: L'identifiant de la livraison
 *               address_id:
 *                 type: integer
 *                 description: L'identifiant de l'adresse
 *               total_price:
 *                 type: number
 *                 description: Le prix total de la commande
 *               status:
 *                 type: string
 *                 description: Le statut de la commande
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/order/delivery/:delivery_id', getAllOrdersByDeliveryId);
    /**
 * @swagger
 * /order/delivery/{delivery_id}:
 *   get:
 *     tags: [Orders]
 *     description: Récupère toutes les commandes par identifiant de livraison
 *     parameters:
 *       - in: path
 *         name: delivery_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la livraison
 *     responses:
 *       200:
 *         description: Liste des commandes récupérée avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de la commande
 *               user_id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur
 *               restaurant_id:
 *                 type: integer
 *                 description: L'identifiant du restaurant
 *               delivery_id:
 *                 type: integer
 *                 description: L'identifiant de la livraison
 *               address_id:
 *                 type: integer
 *                 description: L'identifiant de l'adresse
 *               total_price:
 *                 type: number
 *                 format: float
 *                 description: Le prix total de la commande
 *               status:
 *                 type: string
 *                 description: Le statut de la commande
 *       404:
 *         description: Commandes non trouvées
 *       500:
 *         description: Erreur interne du serveur
 */
}