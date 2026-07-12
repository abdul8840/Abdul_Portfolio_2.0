import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createrating, getrating, deleterating, getreviews } from "../controllers/rating.controller.js";

const router = express.Router();

router.post('/createrating', verifyToken, createrating);
router.get('/getratings', getrating);
router.delete('/deleterating/:ratingId', verifyToken, deleterating)
router.get('/getreviews', verifyToken, getreviews);

export default router;