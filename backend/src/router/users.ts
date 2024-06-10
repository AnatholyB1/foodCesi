import express from 'express'
import { deleteUser, getAllUsers, updateUser,deleteAllTheUsers } from '../controllers/users'
import { isAuthenticated, isOwner } from '../middlewares'

export default (router: express.Router) => {
/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations about user
 */
    //router.delete('/users', deleteAllTheUsers)
    router.get('/users',isAuthenticated, getAllUsers)
    /**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
 *     description: Récupère tous les utilisateurs
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
 *                 description: L'identifiant de l'utilisateur
 *               username:
 *                 type: string
 *                 description: Le nom d'utilisateur
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur
 *               type:
 *                 type: string
 *                 description: Le type d'utilisateur
 *               refreshToken:
 *                 type: string
 *                 description: Le jeton de rafraîchissement de l'utilisateur
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur interne du serveur
 */

    router.delete('/users/:id',isAuthenticated, isOwner, deleteUser)
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [User]
 *     description: Supprime un utilisateur par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser)
/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     tags: [User]
 *     description: Met à jour un utilisateur par ID
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Les informations mises à jour de l'utilisateur
 *         schema:
 *           type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             username:
 *               type: string
 *               description: Le nom d'utilisateur
 *             email:
 *               type: string
 *               description: L'email de l'utilisateur
 *             type:
 *               type: string
 *               description: Le type d'utilisateur
 *             refreshToken:
 *               type: string
 *               description: Le jeton de rafraîchissement de l'utilisateur
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: La date et l'heure de création de l'utilisateur
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               description: La date et l'heure de la dernière mise à jour de l'utilisateur
 *       400:
 *         description: Paramètres invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
}   