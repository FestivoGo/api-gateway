"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const Mailer_1 = __importDefault(require("../../utils/Mailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MAILER_EMAIL = process.env.MAILER_EMAIL;
async function SendEmail(req, res) {
    let emailData = req.body;
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
    `;
    try {
        if (!emailData.email || !emailData.subject || !emailData.message)
            return res.status(400).json({ message: "all field required" });
        const info = await Mailer_1.default.sendMail({
            from: `"Form Dari Website Festivo.co" <${MAILER_EMAIL}>`,
            to: "hello@festivo.co",
            subject: emailData.subject,
            html: emailBody,
        });
        console.log("Message sent: %s", info.messageId);
        return res.status(200).json({ message: "success" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.SendEmail = SendEmail;
//# sourceMappingURL=festivo.controller.js.map