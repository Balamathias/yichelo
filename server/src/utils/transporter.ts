import nodemailer from 'nodemailer'

import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  from: 'Yichelo <' + process.env.EMAIL + '>',
  name: "Yichelo"
});