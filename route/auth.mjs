import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/User.mjs';
import stringGenerator from '../util/stringGenerator.mjs';
import jwt from 'jsonwebtoken';
import fetchUserId from '../middleware/fetchUserId.mjs'; 

const auth = express.Router();

const secretKey = 'Liechtenstein';

// user creation /auth/signup - Doesn't require authentication
auth.post('/signup', async (req, res) => {
    let statusMessage = 'fail';
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(password, salt);
    const userNameLength = 6;
    const userName = stringGenerator(userNameLength);

    const newUser = User({
        userName,
        name,
        password: secretPassword,
        email
    });

    newUser.save().then(() => {
        statusMessage = 'success';
        return res.status(200).json({ statusMessage, msg: `User ${name} has been created with secret username ${userName}` });
    }).catch((error) =>
        res.status(500).json({statusMessage, msg: `User: ${name} not created due to ${error.message}`})
    );
    
})

// user creation /auth/login - Doesn't require authentication
auth.post('/login', async (req, res) => {
    let statusMessage = 'fail';
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user) {
        return res.status(400).json({statusMessage, msg: 'Wrong credentials'});
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if(!passwordMatches) {
        return res.status(400).json({statusMessage, msg: 'Wrong credentials'});
    }
    const payload = {
        userId: user.id,
    };
    const token = jwt.sign(payload, secretKey);
    statusMessage = 'success';
    return res.status(200).json({ statusMessage, msg: token });
})

// user data /auth/userData - requires authentication
auth.get('/userData', fetchUserId, async (req, res) => {
    let statusMessage = 'fail';

    try {
        const userData = await User.findById(req.userId).select('-password');
        statusMessage = 'success';
        return res.status(200).json({ statusMessage, msg: userData });
    } catch(error) {
        return res.status(500).json({ statusMessage, msg: 'Could not find the user' });
    }
});

export default auth;