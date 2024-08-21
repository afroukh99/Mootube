import express from'express'
import {addComment,getComments,deleteComment} from '../controllers/Comment.js'
import { verifyToken } from "../verify.js";


 const router = express.Router();

router.post('/',verifyToken,addComment)
router.delete('/:videoId',verifyToken,deleteComment)
router.get('/:videoId',getComments)



export default router