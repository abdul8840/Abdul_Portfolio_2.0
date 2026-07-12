import { errorHandler } from "../utils/error.js";
import Service from '../models/service.model.js';

export const createservice = async (req, res, next) => {
  if(!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create service'));
  }

  if(!req.body.serviceTitle || !req.body.serviceContent){
    return next(errorHandler(400, 'Please fill all the fields'));
  }

  try {
    const newService = new Service({
      ...req.body,
      userId: req.user.id,
    })
    const saveService = await newService.save();
    res.status(201).json(saveService);
    
  } catch (error) {
    next(error);
  }
    
  
}

export const getservices = async (req,res,next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const services = await Service.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.servicesTitle && { servicesTitle: req.query.servicesTitle }),
      ...(req.query.serviceDescription && { serviceDescription: req.query.serviceDescription }),
      ...(req.query.serviceId && { _id: req.query.serviceId }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalServices = await Service.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthServices = await Service.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      services,
      totalServices,
      lastMonthServices,
    });
  } catch (error) {
    next(error);
  }
}

export const getservice = async (req, res, next) => {
  try {
    const services = await Service.find().sort({
      createdAt: -1
    });
    res.status(200).json(services);
    
    
  } catch (error) {
    next(error)
    
  }
};

export const deleteservice = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
    await Service.findByIdAndDelete(req.params.serviceId);
    res.status(200).json( 'Service deleted successfully' );
    
  } catch (error) {
    next(error);
    
  }
}