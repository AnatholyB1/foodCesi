import express from 'express';

import { register, login, refreshToken} from '../controllers/authentication'


export default (router: express.Router) => {
    /**
     * @swagger
     * tags:
     *   name: Auth
     *   description: Operations about user authentication
     */

    router.post('/auth/register', register);
    /**
     * @swagger
     * /auth/register:
     *   post:
     *     tags: [Auth]
     *     description: Register in a user
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             email:
     *               type: string
     *               description: The user's email
     *             password:
     *               type: string
     *               description: The user's password
     *     responses:
     *       200:
     *         description: Success
     *         schema:
     *              type: object
     *              properties:
     *               id: 
     *                  type: string
     *               username: 
     *                  type: string
     *               email: 
     *                  type: string
     *               password: 
     *                  type: string
     *               salt: 
     *                  type: string
     *               sessionToken: 
     *                  type: string
     *               createdAt: 
     *                  type: string
     *               updatedAt: 
     *                  type: string
     *       401:
     *         description: Unauthorized
     */
    router.post('/auth/login', login);
        /**
     * @swagger
     * /auth/login:
     *   post:
     *     tags: [Auth]
     *     description: Logs in a user
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             email:
     *               type: string
     *               description: The user's email
     *             username:
     *               type: string
     *               description: The user's username
     *             password:
     *               type: string
     *               description: The user's password
     *     responses:
     *       200:
     *         description: Success
     *         schema:
     *              type: object
     *              properties:
     *               id: 
     *                  type: string
     *               username: 
     *                  type: string
     *               email: 
     *                  type: string
     *               password: 
     *                  type: string
     *               salt: 
     *                  type: string
     *               sessionToken: 
     *                  type: string
     *               createdAt: 
     *                  type: string
     *               updatedAt: 
     *                  type: string
     *       401:
     *         description: Unauthorized
     */
    router.post('/auth/refresh/:refreshToken', refreshToken);
    /**
     * @swagger
     * /auth/refresh/{refreshToken}:
     *   post:
     *     tags: [Auth]
     *     description: Refreshes a user's session token
     *     parameters:
     *       - name: refreshToken
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *           description: The user's refresh token
     *     responses:
     *       200:
     *         description: Success
     *         schema:
     *              type: object
     *              properties:
     *               id: 
     *                  type: string
     *               username: 
     *                  type: string
     *               email: 
     *                  type: string
     *               password: 
     *                  type: string
     *               salt: 
     *                  type: string
     *               sessionToken: 
     *                  type: string
     *               createdAt: 
     *                  type: string
     *               updatedAt: 
     *                  type: string
     *       401:
     *         description: Unauthorized
     */

}