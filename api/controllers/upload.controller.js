import { errorHandler } from '../utils/error.js';

export const uploadFile = (req, res, next) => {
  if (!req.file) {
    return next(errorHandler(400, 'No file uploaded'));
  }
  res.status(200).json({ url: `/uploads/${req.file.filename}` });
};
