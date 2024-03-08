import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'directprofsite@gmail.com',
    pass: 'vokz guae dkys oson ',
  },
});
export default transporter;