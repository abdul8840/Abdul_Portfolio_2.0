import { errorHandler } from "../utils/error.js"
import Rating from '../models/rating.model.js';

export const createrating = async (req, res, next) => {
  try {
    const { rating, review, userId } = req.body;
    if(userId != req.user.id){
      next(errorHandler(403, 'You are not allowed to create review'));
    }
    const newRating = new Rating({
      rating,
      review,
      userId,
    })
    await newRating.save();
    res.status(200).json(newRating);
  
  } catch (error) {
    next(error)
    
  }
}

export const getrating = async (req, res, next) => {
  try {
    const ratings = await Rating.find().sort({
      createdAt: -1
    });
    res.status(200).json(ratings);
    
    
  } catch (error) {
    next(error)
    
  }
};

export const deleterating = async (req, res, next) => {
  try {
    const rating = await Rating.findById(req.params.ratingId);
    if (!rating) {
      return next(errorHandler(404, 'Rating not found'));
    }
    if(rating.userId != req.user.id && !req.user.isAdmin){
      next(errorHandler(403, 'You are not allowed to delete this review'));
    }
    await Rating.findByIdAndDelete(req.params.ratingId);
    res.status(200).json( 'Rating deleted successfully' );
    
  } catch (error) {
    next(error)
  }
}

export const getreviews = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, 'You are not allowed to get all ratings'));
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;
    const ratings = await Rating.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalRatings = await Rating.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthRating = await Rating.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ ratings, totalRatings, lastMonthRating });
  } catch (error) {
    next(error);
  }
}