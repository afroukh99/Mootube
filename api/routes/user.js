import express from'express'
import {updateUser,deleteUser,subscribe,unsubscribe, getUser} from '../controllers/User.js'
import { verifyToken } from "../verify.js";


 const router = express.Router();

router.put('/:id',verifyToken,updateUser)
router.delete('/:id',verifyToken,deleteUser)
router.put('/sub/:id',verifyToken,subscribe)
router.put('/unsub/:id',verifyToken,unsubscribe)
router.get('/find/:id',getUser)




export default router