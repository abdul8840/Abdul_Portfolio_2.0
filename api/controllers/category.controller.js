import { errorHandler } from "../utils/error.js";
import Category from '../models/category.model.js';

export const createcategory = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a category'));
  }
  if (!req.body.name || !req.body.type) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  if (!['skill', 'project'].includes(req.body.type)) {
    return next(errorHandler(400, 'Invalid category type'));
  }
  try {
    const name = req.body.name.trim();
    const existing = await Category.findOne({
      type: req.body.type,
      name: { $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' },
    });
    if (existing) {
      return res.status(200).json(existing);
    }
    const newCategory = new Category({
      name,
      type: req.body.type,
      userId: req.user.id,
    });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

export const getcategories = async (req, res, next) => {
  try {
    const categories = await Category.find({
      ...(req.query.type && { type: req.query.type }),
    }).sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const deletecategory = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this category'));
  }
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json('The category has been deleted');
  } catch (error) {
    next(error);
  }
};
