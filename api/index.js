import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import skillRoutes from './routes/skill.route.js';
import serviceRoutes from './routes/service.route.js';
import ratingRoutes from './routes/rating.route.js';
import contactRoutes from './routes/contact.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT

mongoose.connect(process.env.MONGO).then(
  () => console.log('Connected to MongoDB'),
).catch(
  (err) => console.error(err),
)

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/skill', skillRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/contact', contactRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
