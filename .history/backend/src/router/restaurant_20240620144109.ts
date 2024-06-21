import express from 'express'
import {getAllRestaurants,getARestaurantById,getRestaurantsByUser,createARestaurant ,updateARestaurant,deleteARestaurant,deleteAllRestaurantsByUserId } from '../controllers/restaurant'
import {apiKeyMiddleware} from '../middlewares'

export default (router: express.Router) => {
    /**
     * @swagger
     * tags:
     *   name: Restaurants
     *   description: Operations about restaurants
     */
    router.get('/restaurants', getAllRestaurants);
/**
 * @swagger
 * /restaurants:
 *   get:
 *     tags: [Restaurants]
 *     description: Récupère tous les restaurants
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
 *                 description: L'identifiant du restaurant
 *               user_id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur
 *               name:
 *                 type: string
 *                 description: Le nom du restaurant
 *               address_id:
 *                 type: integer
 *                 description: L'identifiant de l'adresse
 *               phone_number:
 *                 type: string
 *                 description: Le numéro de téléphone du restaurant
 *               created_at:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure de création du restaurant
 *               updated_at:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure de la dernière mise à jour du restaurant
 *               categories:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Les catégories du restaurant
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/restaurants/:id', getARestaurantById);
    /**
 * @swagger
 * /restaurants/{id}:
 *   get:
 *     tags: [Restaurants]
 *     description: Récupère un restaurant par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant du restaurant
 *     responses:
 *       200:
 *         description: Succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant du restaurant
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             name:
 *               type: string
 *               description: Le nom du restaurant
 *             address_id:
 *               type: integer
 *               description: L'identifiant de l'adresse
 *             phone_number:
 *               type: string
 *               description: Le numéro de téléphone du restaurant
 *             created_at:
 *               type: string
 *               format: date-time
 *               description: La date et l'heure de création du restaurant
 *             updated_at:
 *               type: string
 *               format: date-time
 *               description: La date et l'heure de la dernière mise à jour du restaurant
 *             categories:
 *               type: array
 *               items:
 *                 type: integer
 *               description: Les catégories du restaurant
 *       404:
 *         description: Restaurant non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/restaurants/user/:user_id', getRestaurantsByUser);
    /**
 * @swagger
 * /restaurants/user/{user_id}:
 *   get:
 *     tags: [Restaurants]
 *     description: Récupère les restaurants par l'ID de l'utilisateur
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'utilisateur
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
 *                 description: L'identifiant du restaurant
 *               user_id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur
 *               name:
 *                 type: string
 *                 description: Le nom du restaurant
 *               address_id:
 *                 type: integer
 *                 description: L'identifiant de l'adresse
 *               phone_number:
 *                 type: string
 *                 description: Le numéro de téléphone du restaurant
 *               created_at:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure de création du restaurant
 *               updated_at:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure de la dernière mise à jour du restaurant
 *               categories:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Les catégories du restaurant
 *       404:
 *         description: Restaurants non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
    router.post('/restaurants', createARestaurant);
    /**
 * @swagger
 * /restaurants:
 *   post:
 *     tags: [Restaurants]
 *     description: Crée un nouveau restaurant
 *     parameters:
 *       - in: body
 *         name: restaurant
 *         description: Les informations du restaurant à créer
 *         schema:
 *           type: object
 *           required:
 *             - user_id
 *             - name
 *             - street
 *             - city
 *             - state
 *             - zip_code
 *             - country
 *             - phone_number
 *             - categories
 *           properties:
 *             user_id:
 *               type: integer
 *             name:
 *               type: string
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             zip_code:
 *               type: string
 *             country:
 *               type: string
 *             phone_number:
 *               type: string
 *             categories:
 *               type: array
 *               items:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Restaurant créé avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant du restaurant
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             name:
 *               type: string
 *               description: Le nom du restaurant
 *             address_id:
 *               type: integer
 *               description: L'identifiant de l'adresse
 *             phone_number:
 *               type: string
 *               description: Le numéro de téléphone du restaurant
 *             created_at:
 *               type: string
 *               format: date-time
 *               description: La date et l'heure de création du restaurant
 *             updated_at:
 *               type: string
 *               format: date-time
 *               description: La date et l'heure de la dernière mise à jour du restaurant
 *             categories:
 *               type: array
 *               items:
 *                 type: integer
 *               description: Les catégories du restaurant
 *       400:
 *         description: Informations manquantes ou incorrectes
 *       500:
 *         description: Erreur interne du serveur
 */
    router.put('/restaurants/:id', updateARestaurant);
    /**
 * @swagger
 * /restaurants/{id}:
 *   put:
 *     tags: [Restaurants]
 *     description: Met à jour un restaurant par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant du restaurant
 *       - in: body
 *         name: restaurant
 *         description: Les informations mises à jour du restaurant
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             name:
 *               type: string
 *               description: Le nom du restaurant
 *             street:
 *               type: string
 *               description: La rue de l'adresse
 *             city:
 *               type: string
 *               description: La ville de l'adresse
 *             state:
 *               type: string
 *               description: L'état de l'adresse
 *             zip_code:
 *               type: string
 *               description: Le code postal de l'adresse
 *             country:
 *               type: string
 *               description: Le pays de l'adresse
 *             address_id:
 *               type: integer
 *               description: L'identifiant de l'adresse
 *             phone_number:
 *               type: string
 *               description: Le numéro de téléphone du restaurant
 *             categories:
 *               type: array
 *               items:
 *                 type: integer
 *               description: Les catégories du restaurant
 *     responses:
 *       200:
 *         description: Restaurant mis à jour avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant du restaurant
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             name:
 *               type: string
 *               description: Le nom du restaurant
 *             address_id:
 *               type: integer
 *               description: L'identifiant de l'adresse
 *             phone_number:
 *               type: string
 *               description: Le numéro de téléphone du restaurant
 *             categories:
 *               type: array
 *               items:
 *                 type: integer
 *               description: Les catégories du restaurant
 *             created_at:
 *               type: string
 *               format: date-time
 *               description: La date de création du restaurant
 *             updated_at:
 *               type: string
 *               format: date-time
 *               description: La date de la dernière mise à jour du restaurant
 *             street:
 *               type: string
 *               description: La rue de l'adresse
 *             city:
 *               type: string
 *               description: La ville de l'adresse
 *             state:
 *               type: string
 *               description: L'état de l'adresse
 *             zip_code:
 *               type: string
 *               description: Le code postal de l'adresse
 *             country:
 *               type: string
 *               description: Le pays de l'adresse
 *       400:
 *         description: Paramètres invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Restaurant non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/restaurants/:id', deleteARestaurant);
    /**
 * @swagger
 * /restaurants/{id}:
 *   delete:
 *     tags: [Restaurants]
 *     description: Supprime un restaurant par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant du restaurant
 *     responses:
 *       200:
 *         description: Restaurant supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Restaurant non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/restaurants/user/:user_id', deleteAllRestaurantsByUserId);
    /**
 * @swagger
 * /restaurants/user/{user_id}:
 *   delete:
 *     tags: [Restaurants]
 *     description: Supprime tous les restaurants par ID d'utilisateur
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'utilisateur
 *     responses:
 *       200:
 *         description: Restaurants supprimés avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Restaurants non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
}