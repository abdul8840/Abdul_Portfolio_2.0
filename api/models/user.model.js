import { Timestamp } from "bson";
import mongoose, { Schema } from "mongoose";

const uaerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw0huuUl-M5riKH_1wBSZ379&ust=1717239009111000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCGjOvbt4YDFQAAAAAdAAAAABAE",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true}
)

const User = mongoose.model('User', uaerSchema);

export default User;