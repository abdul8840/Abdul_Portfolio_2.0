import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  technology: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'uncategorized',
  },
  percent: {
    type: Number,
    default: 1,
    required: true,
  },
  image: {
    type: String,
    default: 'https://img.freepik.com/premium-vector/skills-icon-with-settings-sign-skills-icon-customize-setup-manage-process-symbol-vector-icon_775815-966.jpg',
  },
}, {timestamps: true});

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;