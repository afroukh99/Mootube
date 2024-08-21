import express  from "express";
import {login, register,signWithGoogle} from '../controllers/Auth.js'
import { verifyToken } from "../verify.js";


 const router = express.Router();

router.post('/signup',register)
router.post('/login',login)
router.post('/google',signWithGoogle)



export default router