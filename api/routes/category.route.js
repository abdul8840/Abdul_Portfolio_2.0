import express from "express";
import { verifyToken } from '../utils/verifyUser.js';
import { createcategory, getcategories, deletecategory } from '../controllers/category.controller.js';

const router = express.Router();

router.post('/createcategory', verifyToken, createcategory);
router.get('/getcategories', getcategories);
router.delete('/deletecategory/:categoryId/:userId', verifyToken, deletecategory);

export default router;
