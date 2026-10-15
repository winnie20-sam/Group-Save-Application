import express from "express";
import { createToken, stkPush } from "../controllers/Mpesa.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// must be logged in -> get token -> send STK push
router.post('/mpesa/stkpush', verifyUser, createToken, stkPush);

export default router;
