import transporter from './nodemailer';
import fs from 'fs';
import path from 'path';

interface EmailData {
    email: string;
    token: string;
}

export const sendVerificationEmail = async ({ email, token }: EmailData) => {
    const mailOptions = {
        from: 'DirectProf',
        to: email,
        subject: 'Verify Your Email Address',
        html: `./emailVerify.html`,
    };
    console.log('Sending email to: ', email);
    return transporter.sendMail(mailOptions);
};

