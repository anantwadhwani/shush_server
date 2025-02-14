import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const pass = process.env.TRANSPORTER_PASS;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'shushem.anonymous@gmail.com',
        pass: pass
    },
});

export default transporter;