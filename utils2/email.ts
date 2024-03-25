import transporter from "@/utils/nodemailer";

interface EmailData {
    email: string;
    token: string;
    data: any;
}

export const sendEnrollmentEmail = async ({ email, token, data }: EmailData) => {
    const mailOptions = {
        from: `"DirectProf" <directprofsite@gmail.com>`,
        to: email,
        subject: 'You will have a lesson soon!',
        html:   "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<title>DirectProf</title>" +
                "<style>" +
                "h1 {color: blue;}" +
                "p {color: black;}" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<h1>DirectProf</h1>" +
                "<p>You have been enrolled in a course, please check the details below:</p>" +
                "<p>Course: Math</p>" +
                "<p>Teacher: John Doe</p>" +
                "<p>Price: $10</p>" +
                "<p>Date: 01/01/2022</p>" +
                "<p>Time: 10:00 - 11:00</p>" +
                "</body>" +
                "</html>"
    };
    console.log('Sending email to: ', email);
    return transporter.sendMail(mailOptions);
};