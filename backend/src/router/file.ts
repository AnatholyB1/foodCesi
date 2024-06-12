import express from 'express';
import * as fileController from '../controllers/file'; // replace with the actual path to your fileController file

export default (router: express.Router) => {
    router.post('/upload', fileController.uploadFile, fileController.handleFileUpload);
}



