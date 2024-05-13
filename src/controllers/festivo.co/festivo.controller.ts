import { Request, Response } from "express";
import transporter from "../../utils/Mailer"

export async function SendEmail(req: Request, res:Response){
    let emailData = req.body

    try {
        const info = await transporter.sendMail({
            from: `"Assami Muzaki" <assamim80@gmail.com>`,
            to: emailData.email,
            subject: emailData.subject,
            html: emailData.message,
        });

        console.log("Message sent: %s", info.messageId);

        return res.status(200).json({message: "success"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}