import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
  deleteAllTheUsers,
  getAUserById,
  sponsorUser,
} from "../controllers/users";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: Operations about users
   */
  router.put("/users/sponsor/:sponsor_code", isAuthenticated, sponsorUser);
  /**
 * @swagger
 * /users/sponsor/{sponsor_code}:
 *   put:
 *     tags: [Users]
 *     summary: Sponsor a user by sponsor code
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sponsor_code
 *         schema:
 *           type: string
 *         required: true
 *         description: Sponsor code of the user
 *     responses:
 *       200:
 *         description: User successfully sponsored
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user sponsored
 *                 owner:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     type:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *                     active:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request
 *       403:
 *         description: Forbidden, owner already sponsor
 *       500:
 *         description: Internal server error
 */
  router.get("/users/:id", getAUserById);
  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     tags: [Users]
   *     summary: Get a user by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The ID of the user
   *     responses:
   *       200:
   *         description: A user object
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 username:
   *                   type: string
   *                 email:
   *                   type: string
   *                 type:
   *                   type: string
   *                 active:
   *                   type: boolean
   *                 createdAt:
   *                   type: string
   *                   format: date-time
   *                 updatedAt:
   *                   type: string
   *                   format: date-time
   *       400:
   *         description: id not found
   *       404:
   *         description: user not found
   *       500:
   *         description: Internal server error
   */
  router.delete("/users", deleteAllTheUsers);
  /**
   * @swagger
   * /users:
   *   delete:
   *     tags: [Users]
   *     summary: Delete all users
   *     responses:
   *       200:
   *         description: Number of users deleted
   *       500:
   *         description: Internal server error
   */
  router.get("/users", getAllUsers);
  /**
   * @swagger
   * /users:
   *   get:
   *     tags: [Users]
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

  router.delete("/users/:id", deleteUser);
  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     tags: [Users]
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
  router.put("/users/:id", updateUser);
  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     tags: [Users]
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
};
