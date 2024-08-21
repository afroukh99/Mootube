import express from'express'
import {addVideo,deleteVideo,subVideo,updateVideo,getVideos,getVideo, addView, trendVideos, getRandomVideos, getByTags, search} from '../controllers/Video.js'
import { verifyToken } from "../verify.js";
import {like,dislike} from '../controllers/Like.js'


 const router = express.Router();

router.put('/:id',verifyToken,updateVideo)
router.put('/views/:videoId',verifyToken,addView)
router.put('/like/:videoId',verifyToken,like)
router.put('/dislike/:videoId',verifyToken,dislike)


router.delete('/:id',verifyToken,deleteVideo)
router.get('/sub',verifyToken,subVideo)
router.get('/random',getRandomVideos)
router.get('/trend',trendVideos)
router.get('/tags',getByTags)
router.get('/search',search)
router.get('/:id',getVideo)
router.get('/',getVideos)

router.post('/',verifyToken,addVideo)




export default router