import express from 'express';
import multer from 'multer';
import { verifyToken } from '../utils/verifyUser.js';
import { uploadFile } from '../controllers/upload.controller.js';
import { errorHandler } from '../utils/error.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return next(errorHandler(400, 'Image must be less than 2MB'));
    }
    if (err) {
      return next(errorHandler(400, err.message));
    }
    next();
  });
};

const router = express.Router();

router.post('/', verifyToken, handleUpload, uploadFile);

export default router;
