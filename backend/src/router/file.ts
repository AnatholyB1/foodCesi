import express from 'express';
import * as fileController from '../controllers/file'; // replace with the actual path to your fileController file

export default (router: express.Router) => {
    /**
     * @swagger
     * tags:
     *   name: File Upload
     *   description: Operations about file upload
     */

    router.post('/upload', fileController.uploadFile, fileController.handleFileUpload);
    /**
     * @swagger
     * /upload:
     *   post:
     *     tags: [File Upload]
     *     summary: Upload a file
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               file:
     *                 type: string
     *                 format: binary
     *     responses:
     *       200:
     *         description: File uploaded successfully
     *       500:
     *         description: Internal server error
     */
}



