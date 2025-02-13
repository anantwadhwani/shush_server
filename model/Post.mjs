import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    secretUserName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    // replies: [{
    //     userName: {
    //         type: String,
    //         required: true
    //     },
    //     name: {
    //         type: String,
    //     },
    //     message: {
    //         type: String,
    //         required: true,
    //     },
    //     date: {
    //         type: Date,
    //         default: Date.now,
    //     },
    // }]
});

export default mongoose.model('post', PostSchema);