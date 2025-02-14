import { Router } from "express";
import fetchUserId from "../middleware/fetchUserId.mjs";
import Post from '../model/Post.mjs';

const shush = Router();

// get shushes made on user /shush/userShushes - requires authentication
shush.get('/userShushes/:userName', fetchUserId, async (req, res) => {
    let statusMessage = 'fail';
    const userName = req.params.userName;
    try {
        const userShushes = await Post.find({ userName });
        if (!userShushes) {
            return res.status(404).json({ statusMessage, msg: 'No shushes found' });
        }
        statusMessage = 'success';
        return res.status(200).json({ statusMessage, msg: userShushes });
    } catch (error) {
        return res.status(500).json({ statusMessage, msg: 'Could not look for shushes due to ' + error });
    }
});

// post a shush on user /shush/shush - requires authentication
shush.post('/shush', fetchUserId, async(req, res) => {
    let statusMessage = 'fail';
    const newPost = await Post({ userId: req.userId, ...req.body });
    newPost.save().then((post) => {
        statusMessage = 'success';
        return res.status(200).json({ statusMessage, msg: post });
    });
});

// get all shushes /shush/feed - requires authentication
shush.get('/feed', fetchUserId, async(req, res) => {
    let statusMessage = 'fail';
    try {
        const allShushes = await Post.find();
        statusMessage = 'success';
        return res.status(200).json({ statusMessage, msg: allShushes });
    } catch (error) {
        return res.status(500).json({ statusMessage, msg: 'Error finding shushes' });
    }
});

export default shush;