import express from 'express';

import { register, login} from '../controllers/authentication'


export default (router: express.Router) => {
    router.post('/auth/register', register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Logs in a user
 *     parameters:
 *       - name: username
 *         description: The user's username
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: The user's password
 *         in: body
 *         required: true
 *         type: string
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
}