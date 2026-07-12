import express from "express";
import { verifyToken } from '../utils/verifyUser.js';
import { createskill, getskills, deleteskill, getskill } from '../controllers/skill.controller.js';

const router = express.Router();

router.post('/createskill', verifyToken, createskill);
router.get('/getskills', getskills);
router.get('/getskill', getskill);
router.delete('/deleteskill/:postId/:userId', verifyToken, deleteskill)

export default router;