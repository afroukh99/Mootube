import Video from '../models/Video.js'


export const like = async (req, res, next) => {
    try {
        const userId = req.user.id
        await Video.findByIdAndUpdate(req.params.videoId, {
            $addToSet: {
                like: userId
            },
            $pull:
            {
                dislike: userId
            }
        })
        res.status(200).json("Video has been liked")
    } catch (error) {
        next(error)
    }

}


export const dislike =async (req, res, next) => {
    try {
        const userId = req.user.id
        await Video.findByIdAndUpdate(req.params.videoId, {
            $addToSet: {
                dislike: userId
            },
            $pull:
            {
                like: userId
            }
        })
        res.status(200).json("Video has been disliked")
    } catch (error) {
        next(error)
    }
}