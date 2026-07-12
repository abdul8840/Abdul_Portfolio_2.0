import { errorHandler } from "../utils/error.js";
import Skill from '../models/skill.model.js';

export const createskill = async (req,res,next) => {
  if(!req.user.isAdmin){
    return next(errorHandler(403, 'You are not allowed to create a post'))
  }
  if (!req.body.technology || !req.body.percent) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  try {
    const newSkill = new Skill({
      ...req.body,
      userId: req.user.id
    })
    const saveSkill = await newSkill.save();
    res.status(201).json(saveSkill);

  } catch (error) {
    next(error);
  }

}

export const getskills = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const skills = await Skill.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.technology && { technology: req.query.technology }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.percent && { percent: req.query.percent }),
      ...(req.query.skillId && { _id: req.query.skillId }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalSkills = await Skill.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthSkills = await Skill.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      skills,
      totalSkills,
      lastMonthSkills,
    });
  } catch (error) {
    next(error);
  }
}

export const getskill = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({
      createdAt: -1
    });
    res.status(200).json(skills);
    
    
  } catch (error) {
    next(error)
    
  }
};

export const deleteskill = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
    await Skill.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
}