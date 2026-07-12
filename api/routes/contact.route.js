import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getContact, deleteContact } from "../controllers/contact.controller.js";

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getcontact', verifyToken, getContact);
router.delete('/deleteContact/:contactId', verifyToken, deleteContact)

export default router;