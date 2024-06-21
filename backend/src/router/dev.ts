import express from "express";
import {
  getDevs,
  getADevById,
  createADev,
  updateADev,
  deleteADev,
  getAllDevByUserId,
  getADevByApiKey,
} from "../controllers/dev";

export default (router: express.Router) => {
  /**
   * @swagger
   * tags:
   *   name: Dev
   *   description: Operations about developer app
   */

  router.get("/devs", getDevs);
  /**
 * @swagger
 * /devs:
 *   get:
 *     tags: [Dev]
 *     summary: Get all developers
 *     responses:
 *       200:
 *         description: A list of developers
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
 *                   apiKey:
 *                     type: string
 *                   appName:
 *                     type: string
 *       404:
 *         description: No developers found
 *       500:
 *         description: Internal server error
 */
  router.get("/devs/:id", getADevById);
  /**
 * @swagger
 * /devs/{id}:
 *   get:
 *     tags: [Dev]
 *     summary: Get a developer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The developer ID
 *     responses:
 *       200:
 *         description: A developer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 apiKey:
 *                   type: string
 *                 appName:
 *                   type: string
 *       404:
 *         description: Developer not found
 *       500:
 *         description: Internal server error
 */
  router.post("/devs", createADev);
  /**
 * @swagger
 * /devs:
 *   post:
 *     tags: [Dev]
 *     summary: Create a new developer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               apiKey:
 *                 type: string
 *               appName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Developer created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 apiKey:
 *                   type: string
 *                 appName:
 *                   type: string
 *       400:
 *         description: Missing parameters
 *       500:
 *         description: Internal server error
 */
  router.put("/devs/:id", updateADev);
  /**
 * @swagger
 * /devs/{id}:
 *   put:
 *     tags: [Dev]
 *     summary: Update a developer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The developer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               appName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Developer updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 apiKey:
 *                   type: string
 *                 appName:
 *                   type: string
 *       400:
 *         description: Missing parameters
 *       404:
 *         description: Developer not found
 *       500:
 *         description: Internal server error
 */
  router.delete("/devs/:id", deleteADev);
  /**
 * @swagger
 * /devs/{id}:
 *   delete:
 *     tags: [Dev]
 *     summary: Delete a developer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The developer ID
 *     responses:
 *       204:
 *         description: Developer deleted
 *       400:
 *         description: Missing parameters
 *       500:
 *         description: Internal server error
 */
  router.get("/devs/user/:user_id", getAllDevByUserId);
  /**
 * @swagger
 * /devs/user/{user_id}:
 *   get:
 *     tags: [Dev]
 *     summary: Get developers by user ID
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of developers
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
 *                   apiKey:
 *                     type: string
 *                   appName:
 *                     type: string
 *       400:
 *         description: Missing parameters
 *       404:
 *         description: Developers not found
 *       500:
 *         description: Internal server error
 */
  router.get("/devs/apiKey/:apiKey", getADevByApiKey);
  /**
 * @swagger
 * /devs/apiKey/{apiKey}:
 *   get:
 *     tags: [Dev]
 *     summary: Get a developer by API key
 *     parameters:
 *       - in: path
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *         description: The API key
 *     responses:
 *       200:
 *         description: A developer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 apiKey:
 *                   type: string
 *                 appName:
 *                   type: string
 *       400:
 *         description: Missing parameters
 *       404:
 *         description: Developer not found
 *       500:
 *         description: Internal server error
 */
};
