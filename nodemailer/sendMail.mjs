import transporter from "./transporter.mjs";

const sendMail = (email, subject, htmlBody) => {
    return transporter.sendMail({
        to: email,
        subject: subject,
        html: htmlBody
    });
};

export default sendMail;
