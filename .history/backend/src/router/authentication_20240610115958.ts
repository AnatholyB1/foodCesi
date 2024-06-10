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
 *     description: Register a new user
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user's creation
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *             - username
 *             - type
 *           properties:
 *             email:
 *               type: string
 *               description: The user's email
 *             password:
 *               type: string
 *               description: The user's password
 *             username:
 *               type: string
 *               description: The user's username
 *             type:
 *               type: string
 *               description: The user's type
 *     responses:
 *       200:
 *         description: User created successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID
 *             email:
 *               type: string
 *               description: The user's email
 *             username:
 *               type: string
 *               description: The user's username
 *             type:
 *               type: string
 *               description: The user's type
 *             refreshToken:
 *               type: string
 *               description: The user's refresh token
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
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
 *     description: Refresh the user's access token
 *     parameters:
 *       - in: path
 *         name: refreshToken
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's refresh token
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID
 *             email:
 *               type: string
 *               description: The user's email
 *             username:
 *               type: string
 *               description: The user's username
 *             type:
 *               type: string
 *               description: The user's type
 *             refreshToken:
 *               type: string
 *               description: The new refresh token
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 *       403:
 *         description: Forbidden - Invalid refresh token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

}