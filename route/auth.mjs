import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/User.mjs';
import stringGenerator from '../util/stringGenerator.mjs';
import passkeyGenerator from '../util/passkeyGenerator.mjs';
import jwt from 'jsonwebtoken';
import fetchUserId from '../middleware/fetchUserId.mjs'; 
import sendMail from '../nodemailer/sendMail.mjs';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRETKEY;

const auth = express.Router();

let passkey = null;

// send a signup mail - Doesn't require authentication
auth.post('/signup', async (req, res) => {
    let statusMessage = 'fail';
    const { email } = req.body;
    passkey = passkeyGenerator(6);
    const subject = "Sign Up Verification";
    const htmlBody = `<h3>Here's your ShushEm launch code!</h3><span style="display: block; max-width: fit-content; background-color:lightblue; color:white; font-weight: bold;">${passkey}</span><p>Once verified, you can start using all of ShushEm's features.</p>`
    try {
        await sendMail(email, subject, htmlBody);
        statusMessage = 'success';
        return res.status(200).json({ statusMessage, msg: 'Email Sent' });
    } catch (error) {
        return res.status(400).json({ statusMessage, msg: 'Email doesn\'t exist' });
    }
});

// user creation upon verification - Doesn't require authentication
auth.post('/verify', async (req, res) => {
    let statusMessage = 'fail';
    const { code, name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(password, salt);
    const userNameLength = 6;
    const userName = `${name}.${stringGenerator(userNameLength)}`;
    const secretUserName = stringGenerator(userNameLength);
    if(code !== passkey) {
        return res.status(400).json({ statusMessage, status: '400', err: 'wrong code', msg: 'Invalid code entered, please re-check or try again' });
    }
    const newUser = User({
        name,
        userName,
        secretUserName,
        email,
        password: secretPassword
    });

    newUser.save().then(() => {
        statusMessage = 'success';
        return res.status(200).json({ statusMessage, msg: `User ${name} has been created with unique user name ${userName} and secret username ${userName}` });
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
        userName: user.userName,
    };
    const token = jwt.sign(payload, secretKey);
    statusMessage = 'success';
    return res.status(200).json({ statusMessage, msg: token });
})

// self data /auth/selfData - requires authentication
auth.get('/selfData', fetchUserId, async (req, res) => {
    let statusMessage = 'fail';
    try {
        const selfData = await User.findById(req.userId).select('-password');
        statusMessage = 'success';
        return res.status(200).json({ statusMessage, msg: selfData });
    } catch(error) {
        return res.status(500).json({ statusMessage, msg: 'Could not find the user' });
    }
});

// user data /auth/userData - requires authentication
auth.get('/userData/:userName', fetchUserId, async (req, res) => {
    let statusMessage = 'fail';
    try {
        const userData = await User.findOne({userName: req.params.userName}).select('-password');
        statusMessage = 'success';
        return res.status(200).json({ statusMessage, msg: userData });
    } catch(error) {
        return res.status(500).json({ statusMessage, msg: 'Could not find the user' });
    }
});


// user list /auth/userList - requires authentication
auth.post('/userList', fetchUserId, async (req, res) => {
    const searchName = req.body.searchName;
    let statusMessage = 'fail';
    try {
        let userList = [];
        if(searchName !== ''){
            userList = await User.find({ name: {$regex: searchName, $options: "i"} }).select('name userName');
            statusMessage = 'success';
            if(userList.length !== 0) {
                return res.status(200).json({ statusMessage, msg: userList });
            }
            else {
                const userList = await User.find({ name: {$regex: '', $options: "i"} }).select('name userName');
                return res.status(200).json({ statusMessage, err: 'Could not find any user with this name, looking for someone else?', msg: userList });
            }
        } else {
            return res.status(200).json({ statusMessage, msg: userList });
        }

    } catch(error) {
        return res.status(500).json({ statusMessage, msg: error });
    }
});

export default auth;