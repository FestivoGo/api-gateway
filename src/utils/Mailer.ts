import nodemailer from "nodemailer"

export default nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "assamim80@gmail.com",
    pass: "ogjgocvvmvjyjdew",
  },
});