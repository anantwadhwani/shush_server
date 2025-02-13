import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'shushem.anonymous@gmail.com',
        pass: 'czxl nckm vdrh wntk'
    },
});

export default transporter;