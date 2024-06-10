import express from "express";
import {getAllReviews,getReview,getReviewsByRestaurant,getReviewsByUser, updateReviewInfo, createNewReview, deleteReviewInfo, deleteReviewsByUser, deleteReviewsByRestaurant} from '../controllers/review';

export default (router: express.Router): void => {
    /**
     * @swagger
     * tags:
     *   name: Reviews
     *   description: Operations about reviews
     */
    router.get('/reviews', getAllReviews);
    /**
 * @swagger
 * /reviews:
 *   get:
 *     tags: [Reviews]
 *     description: Récupère tous les avis
 *     responses:
 *       200:
 *         description: Liste des avis récupérée avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *       404:
 *         description: Aucun avis trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/reviews/:id', getReview);
    /**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     tags: [Reviews]
 *     description: Récupère un avis par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Avis récupéré avec succès
 *         schema:
 *           type: object
 *           properties:
 *             restaurantId:
 *               type: integer
 *             userId:
 *               type: integer
 *             rating:
 *               type: integer
 *             comment:
 *               type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *       404:
 *         description: Avis non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/reviews/restaurant/:restaurant_id', getReviewsByRestaurant);
    /**
 * @swagger
 * /reviews/restaurant/{restaurant_id}:
 *   get:
 *     tags: [Reviews]
 *     description: Récupère les avis par identifiant de restaurant
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des avis récupérée avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *       404:
 *         description: Aucun avis trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/reviews/user/:user_id', getReviewsByUser);
    /**
 * @swagger
 * /reviews/user/{user_id}:
 *   get:
 *     tags: [Reviews]
 *     description: Récupère les avis par identifiant d'utilisateur
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des avis récupérée avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *       404:
 *         description: Aucun avis trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.put('/reviews/:id', updateReviewInfo);
    /**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     tags: [Reviews]
 *     description: Met à jour un avis par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: review
 *         description: Les informations mises à jour de l'avis
 *         schema:
 *           type: object
 *           properties:
 *             restaurantId:
 *               type: integer
 *             userId:
 *               type: integer
 *             rating:
 *               type: integer
 *             comment:
 *               type: string
 *     responses:
 *       200:
 *         description: Avis mis à jour avec succès
 *         schema:
 *           type: object
 *           properties:
 *             restaurantId:
 *               type: integer
 *             userId:
 *               type: integer
 *             rating:
 *               type: integer
 *             comment:
 *               type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *       400:
 *         description: Paramètre manquant ou invalide
 *       404:
 *         description: Avis non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.post('/reviews', createNewReview);
    /**
 * @swagger
 * /reviews:
 *   post:
 *     tags: [Reviews]
 *     description: Crée un nouvel avis
 *     parameters:
 *       - in: body
 *         name: review
 *         description: Les informations de l'avis
 *         schema:
 *           type: object
 *           required:
 *             - restaurantId
 *             - userId
 *             - rating
 *             - comment
 *           properties:
 *             restaurantId:
 *               type: integer
 *             userId:
 *               type: integer
 *             rating:
 *               type: integer
 *             comment:
 *               type: string
 *     responses:
 *       201:
 *         description: Avis créé avec succès
 *         schema:
 *           type: object
 *           properties:
 *             restaurantId:
 *               type: integer
 *             userId:
 *               type: integer
 *             rating:
 *               type: integer
 *             comment:
 *               type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *       400:
 *         description: Paramètre manquant ou invalide
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/reviews/:id', deleteReviewInfo);
    /**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     tags: [Reviews]
 *     description: Supprime un avis par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Avis supprimé avec succès
 *       400:
 *         description: Paramètre manquant ou invalide
 *       404:
 *         description: Avis non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/reviews/user/:user_id', deleteReviewsByUser);
    /**
 * @swagger
 * /reviews/user/{user_id}:
 *   delete:
 *     tags: [Reviews]
 *     description: Supprime tous les avis d'un utilisateur par identifiant
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Avis supprimés avec succès
 *       400:
 *         description: Paramètre manquant ou invalide
 *       404:
 *         description: Avis non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/reviews/restaurant/:restaurant_id', deleteReviewsByRestaurant);
    /**
 * @swagger
 * /reviews/restaurant/{restaurant_id}:
 *   delete:
 *     tags: [Reviews]
 *     description: Supprime toutes les critiques d'un restaurant spécifique
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant du restaurant
 *     responses:
 *       200:
 *         description: Critiques supprimées avec succès
 *       400:
 *         description: Paramètre manquant ou invalide
 *       404:
 *         description: Critiques non trouvées
 *       500:
 *         description: Erreur interne du serveur
 */
};