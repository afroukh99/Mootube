import Video from '../models/Video.js'
import User from '../models/User.js'
import { createError } from '../error.js';

export const addVideo = async (req, res, next) => {
    try {
        const newVideo = new Video({ userId: req.user.id, ...req.body })
        await newVideo.save()
        res.status(200).send(newVideo)
    } catch (error) {
        next(error)
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}


export const getVideos = async (req, res, next) => {
    try {
        const videos = await Video.find()
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }

}


export const subVideo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannel = user.subscribedUsers
        const list = await Promise.all(
            subscribedChannel.map((channelId) => {
                return Video.find({ userId: channelId }).sort({ createdAt: -1 })
            }))
        res.status(200).json(list.flat())
    } catch (error) {
        next(error)
    }

}

export const trendVideos = async (req, res, next) => {
    try {
        const trend = await Video.find().sort({ views: -1 }).limit(3)
        res.status(200).json(trend)
    } catch (error) {
        next(error)
    }

}

export const addView = async (req, res, next) => {
    try {
        const view = await Video.findByIdAndUpdate(req.params.videoId, {
            $inc: { views: +1 }
        },
            {
                new: true
            }
        )
        res.status(200).json(view.views)
    } catch (error) {
        next(error)
    }
}


export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "Video not found"))
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                {
                    new: true
                }
            )
            res.status(200).json(updatedVideo)
        }
        else {
            next(createError(403, "You can update only your video"))
        }
    } catch (error) {
        next(error)
    }

}

export const deleteVideo = async (req, res, next) => {

    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "Video not found"))
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("The video has been deleted successfully")
        }
        else {
            next(createError(403, "You can update only your video"))
        }
    } catch (error) {
        next(error)
    }
}

export const getRandomVideos = async (req, res, next) => {

    try {
        const randomVideos = await Video.aggregate([{ $sample: { size: 3 } }])
        res.status(200).json(randomVideos)
    } catch (error) {
        next(error)
    }
}



export const search = async (req, res, next) => {
    const query = req.query.q
    try {
        const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(30)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }

}



export const getByTags = async (req, res, next) => {
    const tags = req.query.tags.split(",")
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(10)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }

}


