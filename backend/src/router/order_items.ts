import express from 'express';
import {getAllOrderItems, getOrderItem, getOrderItemsByOrder, removeOrderItem, removeOrderItemsByOrder, updateOrderItemById, updateOrderItemsByOrder} from '../controllers/order_items';


export default (router: express.Router): void => {
   /**
     * @swagger
     * tags:
     *   name: Order Items
     *   description: Operations about order items
     */
    router.get('/order_items', getAllOrderItems);
    /**
 * @swagger
 * /order_items:
 *   get:
 *     tags: [Order Items]
 *     description: Récupère tous les éléments de commande
 *     responses:
 *       200:
 *         description: Liste des éléments de commande récupérée avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de l'élément de commande
 *               order_id:
 *                 type: integer
 *                 description: L'identifiant de la commande
 *               menu_item_id:
 *                 type: integer
 *                 description: L'identifiant de l'élément du menu
 *               quantity:
 *                 type: integer
 *                 description: La quantité de l'élément
 *               price:
 *                 type: number
 *                 description: Le prix unitaire de l'élément
 *               total_price:
 *                 type: number
 *                 description: Le prix total de l'élément
 *       404:
 *         description: Aucun élément de commande trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/order_items/:id', getOrderItem);
    /**
 * @swagger
 * /order_items/{id}:
 *   get:
 *     tags: [Order Items]
 *     description: Récupère un élément de commande par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'élément de commande
 *     responses:
 *       200:
 *         description: Élément de commande récupéré avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de l'élément de commande
 *             order_id:
 *               type: integer
 *               description: L'identifiant de la commande
 *             menu_item_id:
 *               type: integer
 *               description: L'identifiant de l'élément du menu
 *             quantity:
 *               type: integer
 *               description: La quantité de l'élément
 *             price:
 *               type: number
 *               description: Le prix unitaire de l'élément
 *             total_price:
 *               type: number
 *               description: Le prix total de l'élément
 *       404:
 *         description: Élément de commande non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/order_items/order/:order_id', getOrderItemsByOrder);
    /**
 * @swagger
 * /order_items/order/{order_id}:
 *   get:
 *     tags: [Order Items]
 *     description: Récupère les éléments de commande par ID de commande
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la commande
 *     responses:
 *       200:
 *         description: Élément(s) de commande récupéré(s) avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de l'élément de commande
 *               order_id:
 *                 type: integer
 *                 description: L'identifiant de la commande
 *               menu_item_id:
 *                 type: integer
 *                 description: L'identifiant de l'élément du menu
 *               quantity:
 *                 type: integer
 *                 description: La quantité de l'élément
 *               price:
 *                 type: number
 *                 description: Le prix unitaire de l'élément
 *               total_price:
 *                 type: number
 *                 description: Le prix total de l'élément
 *       404:
 *         description: Aucun élément de commande trouvé pour cette commande
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/order_items/:id', removeOrderItem);
    /**
 * @swagger
 * /order_items/{id}:
 *   delete:
 *     tags: [Order Items]
 *     description: Supprime un élément de commande par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'élément de commande
 *     responses:
 *       204:
 *         description: Élément de commande supprimé avec succès
 *       400:
 *         description: Requête invalide, identifiant manquant
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/order_items/order/:order_id', removeOrderItemsByOrder);
    /**
 * @swagger
 * /order_items/order/{order_id}:
 *   delete:
 *     tags: [Order Items]
 *     description: Supprime tous les éléments de commande par ID de commande
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la commande
 *     responses:
 *       204:
 *         description: Éléments de commande supprimés avec succès
 *       400:
 *         description: Requête invalide, identifiant manquant
 *       500:
 *         description: Erreur interne du serveur
 */
    router.put('/order_items/:id', updateOrderItemById);
    /**
 * @swagger
 * /order_items/{id}:
 *   put:
 *     tags: [Order Items]
 *     description: Met à jour un élément de commande par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'élément de commande
 *       - in: body
 *         name: values
 *         required: true
 *         description: Les valeurs mises à jour de l'élément de commande
 *         schema:
 *           type: object
 *           properties:
 *             quantity:
 *               type: integer
 *               description: La quantité de l'élément
 *             price:
 *               type: number
 *               description: Le prix unitaire de l'élément
 *             total_price:
 *               type: number
 *               description: Le prix total de l'élément
 *     responses:
 *       204:
 *         description: Élément de commande mis à jour avec succès
 *       400:
 *         description: Requête invalide, identifiant ou valeurs manquants
 *       500:
 *         description: Erreur interne du serveur
 */
    router.put('/order_items/order/:order_id', updateOrderItemsByOrder);
    /**
 * @swagger
 * /order_items/order/{order_id}:
 *   put:
 *     tags: [Order Items]
 *     description: Met à jour tous les éléments de commande par ID de commande
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la commande
 *       - in: body
 *         name: values
 *         required: true
 *         description: Les valeurs mises à jour des éléments de commande
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de l'élément de commande
 *               quantity:
 *                 type: integer
 *                 description: La quantité de l'élément
 *               price:
 *                 type: number
 *                 description: Le prix unitaire de l'élément
 *               total_price:
 *                 type: number
 *                 description: Le prix total de l'élément
 *     responses:
 *       204:
 *         description: Éléments de commande mis à jour avec succès
 *       400:
 *         description: Requête invalide, identifiant ou valeurs manquants
 *       500:
 *         description: Erreur interne du serveur
 */
};