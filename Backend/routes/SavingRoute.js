import express from "express";
import {
    getSaving,
    getSavingById,
    createSaving,
    updateSaving,
    deleteSaving
} from "../controllers/Savings.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/savings', verifyUser,getSaving);
router.get('/savings/:id', verifyUser,getSavingById);
router.post('/savings', verifyUser,createSaving);
router.patch('/savings/:id', verifyUser,updateSaving);
router.delete('/savings/:id',verifyUser, deleteSaving);

export default router;