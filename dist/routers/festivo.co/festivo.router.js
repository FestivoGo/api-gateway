"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const festivo_controller_1 = require("../../controllers/festivo.co/festivo.controller");
const festivoRouter = express_1.default.Router();
festivoRouter.post("/send-email", festivo_controller_1.SendEmail);
exports.default = festivoRouter;
//# sourceMappingURL=festivo.router.js.map