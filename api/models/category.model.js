import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['skill', 'project'],
    required: true,
  },
}, { timestamps: true });

categorySchema.index({ name: 1, type: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);
export default Category;
