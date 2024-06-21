import express from 'express';
import * as fileController from '../controllers/file'; // replace with the actual path to your fileController file

const router = express.Router();

router.post('/upload', fileController.uploadFile, fileController.handleFileUpload);

export default router;