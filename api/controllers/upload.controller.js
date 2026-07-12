import { v2 as cloudinary } from 'cloudinary';
import { errorHandler } from '../utils/error.js';

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const uploadFile = async (req, res, next) => {
  if (!req.file) {
    return next(errorHandler(400, 'No file uploaded'));
  }

  configureCloudinary();

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'abdul-portfolio', resource_type: 'image' },
        (error, uploadResult) => {
          if (error) return reject(error);
          resolve(uploadResult);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload failed:', error.message || error);
    next(errorHandler(500, 'Image upload failed'));
  }
};
