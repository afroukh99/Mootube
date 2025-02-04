import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
    },
    like: {
        type: [String],
        default: []
    },
    dislike: {
        type: [String],
        default: []
    },
}, { timestamps: true })

export default mongoose.model('Video', VideoSchema);