import express from 'express';
import multer from 'multer';
import path from 'path';
import { verifyToken } from '../utils/verifyUser.js';
import { uploadFile } from '../controllers/upload.controller.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.resolve(), 'uploads'));
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '-');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

const router = express.Router();

router.post('/', verifyToken, upload.single('image'), uploadFile);

export default router;
