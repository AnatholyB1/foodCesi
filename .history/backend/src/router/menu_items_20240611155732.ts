import express from 'express';
import {getARestaurantByItemId, deleteItemsByRestaurantId, deleteItem, updateItem, createItem, getItemsByCategoryId, getItemsByRestaurantId, getItemById,getItems} from '../controllers/menu_items';

export default (router: express.Router) => {
    /**
     * @swagger
     * tags:
     *   name: Menu Items
     *   description: Operations about menu items
     */
   router.get('/menu_items', getItems);
   /**
 * @swagger
 * /menu_items:
 *   get:
 *     tags: [Menu Items]
 *     description: Récupère tous les éléments de menu
 *     responses:
 *       200:
 *         description: Liste des éléments de menu récupérée avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: L'identifiant de l'élément de menu
 *               restaurant_id:
 *                 type: number
 *                 description: L'identifiant du restaurant
 *               name:
 *                 type: string
 *                 description: Le nom de l'élément de menu
 *               description:
 *                 type: string
 *                 description: La description de l'élément de menu
 *               price:
 *                 type: number
 *                 description: Le prix de l'élément de menu
 *               category_id:
 *                 type: number
 *                 description: L'identifiant de la catégorie
 *               image_url:
 *                 type: string
 *                 description: URL de l'image de l'élément de menu
 *               available:
 *                 type: boolean
 *                 description: Disponibilité de l'élément de menu
 *       404:
 *         description: Aucun élément de menu trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/menu_items/:id', getItemById);
    /**
 * @swagger
 * /menu_items/{id}:
 *   get:
 *     tags: [Menu Items]
 *     description: Récupère un élément de menu par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: L'identifiant de l'élément de menu
 *     responses:
 *       200:
 *         description: Élément de menu récupéré avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               description: L'identifiant de l'élément de menu
 *             restaurant_id:
 *               type: number
 *               description: L'identifiant du restaurant
 *             name:
 *               type: string
 *               description: Le nom de l'élément de menu
 *             description:
 *               type: string
 *               description: La description de l'élément de menu
 *             price:
 *               type: number
 *               description: Le prix de l'élément de menu
 *             category_id:
 *               type: number
 *               description: L'identifiant de la catégorie
 *             image_url:
 *               type: string
 *               description: URL de l'image de l'élément de menu
 *             available:
 *               type: boolean
 *               description: Disponibilité de l'élément de menu
 *       404:
 *         description: Élément de menu non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/menu_items/restaurant/:restaurant_id', getItemsByRestaurantId);
    /**
 * @swagger
 * /menu_items/restaurant/{restaurant_id}:
 *   get:
 *     tags: [Menu Items]
 *     description: Récupère les éléments de menu par ID de restaurant
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         schema:
 *           type: number
 *         description: L'identifiant du restaurant
 *     responses:
 *       200:
 *         description: Éléments de menu récupérés avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: L'identifiant de l'élément de menu
 *               restaurant_id:
 *                 type: number
 *                 description: L'identifiant du restaurant
 *               name:
 *                 type: string
 *                 description: Le nom de l'élément de menu
 *               description:
 *                 type: string
 *                 description: La description de l'élément de menu
 *               price:
 *                 type: number
 *                 description: Le prix de l'élément de menu
 *               category_id:
 *                 type: number
 *                 description: L'identifiant de la catégorie
 *               image_url:
 *                 type: string
 *                 description: URL de l'image de l'élément de menu
 *               available:
 *                 type: boolean
 *                 description: Disponibilité de l'élément de menu
 *       404:
 *         description: Aucun élément de menu trouvé pour ce restaurant
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/menu_items/category/:category_id', getItemsByCategoryId);
    /**
 * @swagger
 * /menu_items/category/{category_id}:
 *   get:
 *     tags: [Menu Items]
 *     description: Récupère les éléments de menu par ID de catégorie
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: number
 *         description: L'identifiant de la catégorie
 *     responses:
 *       200:
 *         description: Éléments de menu récupérés avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: L'identifiant de l'élément de menu
 *               restaurant_id:
 *                 type: number
 *                 description: L'identifiant du restaurant
 *               name:
 *                 type: string
 *                 description: Le nom de l'élément de menu
 *               description:
 *                 type: string
 *                 description: La description de l'élément de menu
 *               price:
 *                 type: number
 *                 description: Le prix de l'élément de menu
 *               category_id:
 *                 type: number
 *                 description: L'identifiant de la catégorie
 *               image_url:
 *                 type: string
 *                 description: URL de l'image de l'élément de menu
 *               available:
 *                 type: boolean
 *                 description: Disponibilité de l'élément de menu
 *       404:
 *         description: Aucun élément de menu trouvé pour cette catégorie
 *       500:
 *         description: Erreur interne du serveur
 */
    router.post('/menu_items', createItem);
    /**
 * @swagger
 * /menu_items:
 *   post:
 *     tags: [Menu Items]
 *     description: Crée un nouvel élément de menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurant_id:
 *                 type: number
 *                 description: L'identifiant du restaurant
 *               name:
 *                 type: string
 *                 description: Le nom de l'élément de menu
 *               description:
 *                 type: string
 *                 description: La description de l'élément de menu
 *               price:
 *                 type: number
 *                 description: Le prix de l'élément de menu
 *               category_id:
 *                 type: number
 *                 description: L'identifiant de la catégorie
 *               image_url:
 *                 type: string
 *                 description: URL de l'image de l'élément de menu
 *               available:
 *                 type: boolean
 *                 description: Disponibilité de l'élément de menu
 *     responses:
 *       200:
 *         description: Élément de menu créé avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               description: L'identifiant de l'élément de menu
 *             restaurant_id:
 *               type: number
 *               description: L'identifiant du restaurant
 *             name:
 *               type: string
 *               description: Le nom de l'élément de menu
 *             description:
 *               type: string
 *               description: La description de l'élément de menu
 *             price:
 *               type: number
 *               description: Le prix de l'élément de menu
 *             category_id:
 *               type: number
 *               description: L'identifiant de la catégorie
 *             image_url:
 *               type: string
 *               description: URL de l'image de l'élément de menu
 *             available:
 *               type: boolean
 *               description: Disponibilité de l'élément de menu
 *       400:
 *         description: Données de requête invalides
 *       500:
 *         description: Erreur interne du serveur
 */
    router.put('/menu_items/:id', updateItem);
    /**
 * @swagger
 * /menu_items/{id}:
 *   put:
 *     tags: [Menu Items]
 *     description: Met à jour un élément du menu par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'élément du menu
 *       - in: body
 *         name: MenuItem
 *         required: true
 *         description: Les détails de l'élément du menu à mettre à jour
 *         schema:
 *           type: object
 *           properties:
 *             restaurant_id:
 *               type: integer
 *               description: L'identifiant du restaurant
 *             name:
 *               type: string
 *               description: Le nom de l'élément du menu
 *             description:
 *               type: string
 *               description: La description de l'élément du menu
 *             price:
 *               type: number
 *               description: Le prix de l'élément du menu
 *             category_id:
 *               type: integer
 *               description: L'identifiant de la catégorie
 *             image_url:
 *               type: string
 *               description: L'URL de l'image de l'élément du menu
 *             available:
 *               type: boolean
 *               description: La disponibilité de l'élément du menu
 *     responses:
 *       200:
 *         description: Élément du menu mis à jour avec succès
 *       400:
 *         description: Requête invalide, identifiant manquant
 *       404:
 *         description: Élément du menu non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/menu_items/:id', deleteItem);
    /**
 * @swagger
 * /menu_items/{id}:
 *   delete:
 *     tags: [Menu Items]
 *     description: Supprime un élément du menu par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'élément du menu
 *     responses:
 *       200:
 *         description: Élément du menu supprimé avec succès
 *       400:
 *         description: Requête invalide, identifiant manquant
 *       404:
 *         description: Élément du menu non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/menu_items/restaurant/:restaurant_id', deleteItemsByRestaurantId);
    /**
 * @swagger
 * /menu_items/restaurant/{restaurant_id}:
 *   delete:
 *     tags: [Menu Items]
 *     description: Supprime tous les éléments du menu d'un restaurant par l'identifiant du restaurant
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant du restaurant
 *     responses:
 *       200:
 *         description: Éléments du menu supprimés avec succès
 *       400:
 *         description: Requête invalide, identifiant manquant
 *       404:
 *         description: Aucun élément du menu trouvé pour ce restaurant
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/restaurant/menu_item/:item_id', getARestaurantByItemId);
    /**
 * @swagger
 * /menu_items/restaurant/{item_id}:
 *   get:
 *     tags: [Menu Items]
 *     description: Récupère le restaurant associé à un élément du menu par l'identifiant de l'élément du menu
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'élément du menu
 *     responses:
 *       200:
 *         description: Restaurant récupéré avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant du restaurant
 *             name:
 *               type: string
 *               description: Le nom du restaurant
 *             description:
 *               type: string
 *               description: La description du restaurant
 *             address:
 *               type: string
 *               description: L'adresse du restaurant
 *             phone:
 *               type: string
 *               description: Le numéro de téléphone du restaurant
 *       400:
 *         description: Requête invalide, identifiant manquant
 *       404:
 *         description: Restaurant non trouvé pour cet élément du menu
 *       500:
 *         description: Erreur interne du serveur
 */
}

