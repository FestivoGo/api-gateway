import { Request, Response } from "express";
import transporter from "../../utils/Mailer"
import dotenv from "dotenv"

dotenv.config();

const MAILER_EMAIL= process.env.MAILER_EMAIL

export async function SendEmail(req: Request, res:Response){
    let emailData = req.body
    let emailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h3>From: ${emailData.email}</h3>
        <p>${emailData.message}</p>
    </body>
    </html>
    `

    try {

        if(!emailData.email || !emailData.subject || !emailData.message) return res.status(400).json({message: "all field required"})

        const info = await transporter.sendMail({
            from: `"Form Dari Website Festivo.co" <${MAILER_EMAIL}>`,
            to: "hello@festivo.co",
            subject: emailData.subject,
            html: emailBody,
        });

        console.log("Message sent: %s", info.messageId);

        return res.status(200).json({message: "success"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}