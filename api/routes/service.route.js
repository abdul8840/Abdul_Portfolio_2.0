import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createservice, getservices, deleteservice, getservice } from '../controllers/service.controller.js';

const router = express.Router();

router.post('/createservice', verifyToken, createservice);
router.get('/getservices', getservices);
router.get('/getservice', getservice);
router.delete('/deleteservice/:serviceId/:userId', verifyToken, deleteservice)

export default router;