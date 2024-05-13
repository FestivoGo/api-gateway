"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const Mailer_1 = __importDefault(require("../../utils/Mailer"));
async function SendEmail(req, res) {
    let emailData = req.body;
    try {
        const info = await Mailer_1.default.sendMail({
            from: `"Assami Muzaki" <assamim80@gmail.com>`,
            to: emailData.email,
            subject: emailData.subject,
            html: emailData.message,
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