import transporter from './nodemailer';

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

export const sendEnrollmentEmail = async ({ email, token }: EmailData) => {
    const mailOptions = {
        from: 'DirectProf',
        to: email,
        subject: 'You will have a lesson soon!',
        html: `./emailEnroll.html`,
    };
    console.log('Sending email to: ', email);
    return transporter.sendMail(mailOptions);
}