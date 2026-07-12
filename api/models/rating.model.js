import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max:5
  },
  review: {
    type: String,
    required: true
  },

}, {timestamps: true});

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;