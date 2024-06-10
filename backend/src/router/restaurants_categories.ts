import express from 'express'
import {getAllRestaurantCategories, getRestaurantCategory,createRestaurantCategoryInfo ,updateRestaurantCategoryInfo, deleteRestaurantCategoryInfo} from '../controllers/restaurant_categories'

export default (router: express.Router) => {
    /**
     * @swagger
     * tags:
     *   name: Restaurant Categories
     *   description: Operations about restaurant categories
     */
    router.get('/restaurant_categories', getAllRestaurantCategories);
/**
 * @swagger
 * /restaurant_categories:
 *   get:
 *     tags: [Restaurant Categories]
 *     description: Récupère toutes les catégories de restaurant
 *     responses:
 *       200:
 *         description: Liste des catégories de restaurant récupérée avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de la catégorie de restaurant
 *               name:
 *                 type: string
 *                 description: Le nom de la catégorie de restaurant
 *       404:
 *         description: Catégories de restaurant non trouvées
 *       500:
 *         description: Erreur interne du serveur
 */

    router.get('/restaurant_categories/:id', getRestaurantCategory);
/**
 * @swagger
 * /restaurant_categories/{id}:
 *   get:
 *     tags: [Restaurant Categories]
 *     description: Récupère une catégorie de restaurant par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la catégorie de restaurant
 *     responses:
 *       200:
 *         description: Catégorie de restaurant récupérée avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de la catégorie de restaurant
 *             name:
 *               type: string
 *               description: Le nom de la catégorie de restaurant
 *       400:
 *         description: Paramètre manquant
 *       404:
 *         description: Catégorie de restaurant non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
    router.post('/restaurant_categories', createRestaurantCategoryInfo);
/**
 * @swagger
 * /restaurant_categories:
 *   post:
 *     tags: [Restaurant Categories]
 *     description: Crée une nouvelle catégorie de restaurant
 *     parameters:
 *       - in: body
 *         name: category
 *         description: Les informations de la catégorie de restaurant
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Le nom de la catégorie de restaurant
 *     responses:
 *       201:
 *         description: Catégorie de restaurant créée avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de la catégorie de restaurant
 *             name:
 *               type: string
 *               description: Le nom de la catégorie de restaurant
 *       400:
 *         description: Paramètre manquant
 *       500:
 *         description: Erreur interne du serveur
 */
    router.put('/restaurant_categories/:id', updateRestaurantCategoryInfo);
    /**
 * @swagger
 * /restaurant_categories/{id}:
 *   put:
 *     tags: [Restaurant Categories]
 *     description: Met à jour une catégorie de restaurant par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la catégorie de restaurant
 *       - in: body
 *         name: category
 *         description: Les informations mises à jour de la catégorie de restaurant
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Le nom de la catégorie de restaurant
 *     responses:
 *       200:
 *         description: Catégorie de restaurant mise à jour avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de la catégorie de restaurant
 *             name:
 *               type: string
 *               description: Le nom de la catégorie de restaurant
 *       400:
 *         description: Paramètre manquant
 *       404:
 *         description: Catégorie de restaurant non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/restaurant_categories/:id', deleteRestaurantCategoryInfo);
/**
 * @swagger
 * /restaurant_categories/{id}:
 *   delete:
 *     tags: [Restaurant Categories]
 *     description: Supprime une catégorie de restaurant par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la catégorie de restaurant
 *     responses:
 *       200:
 *         description: Catégorie de restaurant supprimée avec succès
 *       400:
 *         description: Paramètre manquant
 *       404:
 *         description: Catégorie de restaurant non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
}