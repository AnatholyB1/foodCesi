import { Request, Response } from 'express';
import { withLogging } from '../helpers';
import multer from 'multer';

import fs from 'fs';

const uploadDirectory = 'uploads/';
fs.mkdirSync(uploadDirectory, { recursive: true });


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const uploadFile = upload.single('file');

export const handleFileUpload = withLogging("handleFileUpload",(req: Request, res: Response) => {
  res.json({ file: req.file });
})