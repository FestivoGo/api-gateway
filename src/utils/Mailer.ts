import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();

const MAILER_EMAIL= process.env.MAILER_EMAIL
const MAILER_PASSWORD= process.env.MAILER_PASSWORD

export default nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAILER_EMAIL,
    pass: MAILER_PASSWORD,
  },
});