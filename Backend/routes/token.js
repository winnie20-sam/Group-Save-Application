import express from"express";
import createToken from "../controllers/token.js";


const router = express.Router();
//const {createToken, stkPush} = require ("../controller/token")

router.post("/",createToken)

export default router

