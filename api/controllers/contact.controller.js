import { errorHandler } from "../utils/error.js";
import Contact from "../models/contact.model.js";

export const create = async (req, res, next) => {
  try {
    const { name, email, message, userId } = req.body;
    if(userId != req.user.id){
      next(errorHandler(403, 'You are not allowed to create review'));
    }
    const newContact = new Contact({
      name,
      email,
      message,
      userId,
    })
    await newContact.save();
    res.status(200).json(newContact);
  
  } catch (error) {
    next(error)
    
  }
};

export const getContact = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, 'You are not allowed to get all contacts'));
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;
    const contacts = await Contact.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalContacts = await Contact.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthContact = await Contact.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ contacts, totalContacts, lastMonthContact });
  } catch (error) {
    next(error);
  }
}

export const deleteContact = async (req, res, next) => {
  if (!req.user.isAdmin ) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
    await Contact.findByIdAndDelete(req.params.contactId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
}
