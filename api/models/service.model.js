import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  serviceTitle: {
    type: String,
    required: true
  },
  serviceDescription: {
    type: String,
    required: true
  },
  serviceContent: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://www.freeiconspng.com/uploads/customer-service-icon-png-9.png',
  },
}, {timestamps: true});

const Service = mongoose.model('Service', serviceSchema);
export default Service;